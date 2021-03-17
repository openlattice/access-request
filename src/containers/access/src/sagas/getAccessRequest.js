// @flow
import {
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { fromJS } from 'immutable';
import {
  DataApiActions,
  DataApiSagas,
} from 'lattice-sagas';
import { Logger, ValidationUtils } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { AppTypes } from '../../../../core/edm/constants';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import { APP_PATHS } from '../../../app';
import {
  GET_ACCESS_REQUEST,
  getAccessRequest,
} from '../actions';
import { ACCESS_REQUEST } from '../reducers/constants';

const { isValidUUID } = ValidationUtils;

const { getEntityData } = DataApiActions;
const { getEntityDataWorker } = DataApiSagas;

const { ACCESS_REQUEST_SUBMISSION } = AppTypes;

const LOG = new Logger('getAccessRequestSagas');

function* getAccessRequestWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;

  try {
    const { value } = action;
    if (!isValidUUID(value)) throw ERR_ACTION_VALUE_TYPE;
    yield put(getAccessRequest.request(action.id));

    const config = yield select((store) => store.getIn(APP_PATHS.APP_CONFIG));
    const accessESID = getESIDFromConfig(config, ACCESS_REQUEST_SUBMISSION);

    const accessResponse = yield call(
      getEntityDataWorker,
      getEntityData({
        entitySetId: accessESID,
        entityKeyId: value
      })
    );

    if (accessResponse.error) throw accessResponse.error;
    response = { data: fromJS(accessResponse.data) };

    yield put(getAccessRequest.success(action.id, {
      [ACCESS_REQUEST]: response.data
    }));

  }
  catch (error) {
    response = { error };
    LOG.error(action.type, error);
    yield put(getAccessRequest.failure(action.id, error));
  }
  finally {
    yield put(getAccessRequest.finally(action.id));
  }
  return response;
}

function* getAccessRequestWatcher() :Saga<void> {
  yield takeEvery(GET_ACCESS_REQUEST, getAccessRequestWorker);
}

export {
  getAccessRequestWatcher,
  getAccessRequestWorker,
};
