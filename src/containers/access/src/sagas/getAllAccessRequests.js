// @flow
import isPlainObject from 'lodash/isPlainObject';
import {
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { fromJS } from 'immutable';
import {
  SearchApiActions,
  SearchApiSagas,
} from 'lattice-sagas';
import { Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { SequenceAction } from 'redux-reqseq';

import { AppTypes, PropertyTypes } from '../../../../core/edm/constants';
import { selectPropertyTypeIDsByFQN } from '../../../../core/redux/selectors';
import { getESIDFromConfig } from '../../../../utils/AppUtils';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import { APP_PATHS } from '../../../app';
import {
  GET_ALL_ACCESS_REQUESTS,
  getAllAccessRequests,
} from '../actions';

const { searchEntitySetData } = SearchApiActions;
const { searchEntitySetDataWorker } = SearchApiSagas;

const { ACCESS_REQUEST_SUBMISSION } = AppTypes;
const { REQUEST_DATE_TIME } = PropertyTypes;

const LOG = new Logger('getAllAccessRequestsSagas');

function* getAllAccessRequestsWorker(action :SequenceAction) :Saga<void> {
  const response :Object = {};
  try {
    const { value } = action;
    if (!isPlainObject(value)) throw ERR_ACTION_VALUE_TYPE;
    yield put(getAllAccessRequests.request(action.id));

    const config = yield select((store) => store.getIn(APP_PATHS.APP_CONFIG));
    const accessESID = getESIDFromConfig(config, ACCESS_REQUEST_SUBMISSION);

    const propertyTypesByFQN = yield select(selectPropertyTypeIDsByFQN([REQUEST_DATE_TIME]));

    const requestDatetimePTID = propertyTypesByFQN.get(REQUEST_DATE_TIME);

    const accessResponse :WorkerResponse = yield call(
      searchEntitySetDataWorker,
      searchEntitySetData({
        entitySetIds: [accessESID],
        maxHits: 10000,
        start: 0,
        constraints: [{
          constraints: [{
            type: 'simple',
            searchTerm: '*',
            fuzzy: false
          }],
        }],
        sort: {
          propertyTypeId: requestDatetimePTID,
          type: 'field'
        }
      })
    );

    if (accessResponse.error) throw accessResponse.error;

    yield put(getAllAccessRequests.success(action.id, {
      hits: fromJS(accessResponse.data.hits)
    }));

  }
  catch (error) {
    response.error = error;
    LOG.error(action.type, error);
    yield put(getAllAccessRequests.failure(action.id, error));
  }
  finally {
    yield put(getAllAccessRequests.finally(action.id));
  }
  return response;
}

function* getAllAccessRequestsWatcher() :Generator<any, any, any> {
  yield takeEvery(GET_ALL_ACCESS_REQUESTS, getAllAccessRequestsWorker);
}

export {
  getAllAccessRequestsWatcher,
  getAllAccessRequestsWorker,
};
