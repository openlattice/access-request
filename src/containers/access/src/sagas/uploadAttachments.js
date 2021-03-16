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
import { selectPropertyTypeIDsByFQN } from '../../../../core/redux/selectors';
import { APP_PATHS } from '../../../app';
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
      files,
      accessRequestId,
    } = action.value;

    const config = yield select((store) => store.getIn(APP_PATHS.APP_CONFIG));
    const accessRequestESID = getESIDFromConfig(config, ACCESS_REQUEST_SUBMISSION);
    const fileESID = getESIDFromConfig(config, FILE);
    const attachedToESID = getESIDFromConfig(config, ATTACHED_TO);

    const propertyTypesByFQN = yield select(selectPropertyTypeIDsByFQN([
      DATE_TIME,
      FILE_DATA,
      LABEL,
      NAME,
      TYPE,
    ]));

    const dateTimePTID = propertyTypesByFQN.get(DATE_TIME);
    const fileDataPTID = propertyTypesByFQN.get(FILE_DATA);
    const namePTID = propertyTypesByFQN.get(NAME);
    const typePTID = propertyTypesByFQN.get(TYPE);

    const now = DateTime.local().toISO();

    const fileEntities = files.map(({
      base64,
      name,
      type,
    }) => ({
      // [tagPTID]: tags.toJS(),
      [dateTimePTID]: [now],
      [typePTID]: [type],
      [namePTID]: [name],
      [fileDataPTID]: [{
        'content-type': type,
        data: cleanBase64ForUpload(base64)
      }]
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
