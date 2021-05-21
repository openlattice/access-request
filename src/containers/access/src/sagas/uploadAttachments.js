// @flow

import {
  call,
  put,
  select,
  takeEvery
} from '@redux-saga/core/effects';
import { DataApi, Models } from 'lattice';
import { Logger } from 'lattice-utils';
import { DateTime } from 'luxon';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import cleanBase64ForUpload from '../../../../utils/cleanBase64ForUpload';
import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { AppTypes, PropertyTypes } from '../../../../core/edm/constants';
import { selectAppConfig, selectPropertyTypeIDsByFQN } from '../../../../core/redux/selectors';
import {
  UPLOAD_ATTACHMENTS,
  uploadAttachments
} from '../actions';

const { DataGraphBuilder } = Models;

const {
  ACCESS_REQUEST_SUBMISSION,
  ATTACHED_TO,
  FILE,
} = AppTypes;
const {
  DATE_TIME,
  FILE_DATA,
  GROUP_ID,
  LABEL,
  NAME,
  TYPE,
} = PropertyTypes;

const LOG = new Logger('DocumentsSagas');

function* uploadAttachmentsWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;

  try {
    yield put(uploadAttachments.request(action.id));

    const {
      accessRequestId,
      files = [],
      tags = [],
      groupId = '',
    } = action.value;

    const config = yield select(selectAppConfig());
    const accessRequestESID = getESIDFromConfig(config, ACCESS_REQUEST_SUBMISSION);
    const fileESID = getESIDFromConfig(config, FILE);
    const attachedToESID = getESIDFromConfig(config, ATTACHED_TO);

    const propertyTypesByFQN = yield select(selectPropertyTypeIDsByFQN([
      DATE_TIME,
      FILE_DATA,
      GROUP_ID,
      LABEL,
      NAME,
      TYPE,
    ]));

    const dateTimePTID = propertyTypesByFQN.get(DATE_TIME);
    const fileDataPTID = propertyTypesByFQN.get(FILE_DATA);
    const namePTID = propertyTypesByFQN.get(NAME);
    const typePTID = propertyTypesByFQN.get(TYPE);
    const tagPTID = propertyTypesByFQN.get(LABEL);
    const groupIdPTID = propertyTypesByFQN.get(GROUP_ID);

    const now = DateTime.local().toISO();

    const fileEntities = files.map(({
      base64,
      name,
      type,
    }, index) => ({
      [dateTimePTID]: [now],
      [fileDataPTID]: [{
        'content-type': type,
        'content-disposition': `attachment; filename="${name}"`,
        data: cleanBase64ForUpload(base64)
      }],
      [groupIdPTID]: [groupId],
      [namePTID]: [name],
      [tagPTID]: [tags[index]],
      [typePTID]: [type],
    }));

    const attachedTo = { [dateTimePTID]: [now] };
    const attachedToAssociations = [];
    files.forEach((file, index) => {
      attachedToAssociations.push({
        srcEntitySetId: fileESID,
        srcEntityIndex: index,
        dstEntitySetId: accessRequestESID,
        dstEntityKeyId: accessRequestId,
        data: attachedTo
      });
    });

    const entities = { [fileESID]: fileEntities };
    const associations = { [attachedToESID]: attachedToAssociations };

    const dataGraph = new DataGraphBuilder()
      .setAssociations(associations)
      .setEntities(entities)
      .build();

    const uploadResponse = yield call(DataApi.createEntityAndAssociationData, dataGraph);
    if (uploadResponse.error) throw uploadResponse.error;

    response = { data: {} };
    yield put(uploadAttachments.success(action.id));
  }
  catch (error) {
    LOG.error(action.type, error);
    response = { error };
    yield put(uploadAttachments.failure(action.id, error));
  }
  finally {
    yield put(uploadAttachments.finally(action.id));
  }

  return response;
}

function* uploadAttachmentsWatcher() :Saga<void> {
  yield takeEvery(UPLOAD_ATTACHMENTS, uploadAttachmentsWorker);
}

export {
  uploadAttachmentsWatcher,
  uploadAttachmentsWorker,
};
