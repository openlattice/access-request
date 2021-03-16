// @flow
import {
  call,
  put,
  select,
  takeLatest,
} from '@redux-saga/core/effects';
import {
  List,
  Map,
  fromJS,
} from 'immutable';
import {
  SearchApiActions,
  SearchApiSagas,
} from 'lattice-sagas';
import { Logger, ValidationUtils } from 'lattice-utils';
import type { UUID } from 'lattice';
import type { SequenceAction } from 'redux-reqseq';

import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { AppTypes, PropertyTypes } from '../../../../core/edm/constants';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import { APP_PATHS } from '../../../app';
import {
  GET_ATTACHMENTS,
  getAttachments,
} from '../actions';

const LOG = new Logger('DocumentsSagas');

const { isValidUUID } = ValidationUtils;
const { searchEntityNeighborsWithFilter } = SearchApiActions;
const { searchEntityNeighborsWithFilterWorker } = SearchApiSagas;

const { FILE, ATTACHED_TO, ACCESS_REQUEST_SUBMISSION } = AppTypes;

function* getAttachmentsWorker(action :SequenceAction) :Generator<any, any, any> {
  const response = {};
  try {
    const { value: accessRequestId } = action;
    if (!isValidUUID(accessRequestId)) throw ERR_ACTION_VALUE_TYPE;

    yield put(getAttachments.request(action.id));

    const config = yield select((store) => store.getIn(APP_PATHS.APP_CONFIG));
    const accessRequestESID = getESIDFromConfig(config, ACCESS_REQUEST_SUBMISSION);
    const fileESID = getESIDFromConfig(config, FILE);
    const attachedToESID = getESIDFromConfig(config, ATTACHED_TO);

    const filesSearchParams = {
      entitySetId: accessRequestESID,
      filter: {
        entityKeyIds: [accessRequestId],
        edgeEntitySetIds: [attachedToESID],
        destinationEntitySetIds: [],
        sourceEntitySetIds: [fileESID]
      }
    };

    const filesResponse = yield call(
      searchEntityNeighborsWithFilterWorker,
      searchEntityNeighborsWithFilter(filesSearchParams)
    );
    if (filesResponse.error) throw filesResponse.error;
    const fileData = fromJS(filesResponse.data)
      .get(accessRequestId, List())
      .map((file) => file.get('neighborDetails'));

    response.data = fileData;

    yield put(getAttachments.success(action.id, {
      data: fileData
    }));
  }
  catch (error) {
    LOG.error(action.type, error);
    yield put(getAttachments.failure(action.id));
  }
  finally {
    yield put(getAttachments.finally(action.id));
  }
  return response;
}

function* getAttachmentsWatcher() :Generator<any, any, any> {
  yield takeLatest(GET_ATTACHMENTS, getAttachmentsWorker);
}

export {
  getAttachmentsWorker,
  getAttachmentsWatcher,
};
