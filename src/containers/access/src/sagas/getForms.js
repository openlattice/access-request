// @flow
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
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { AppTypes } from '../../../../core/edm/constants';
import { APP_PATHS } from '../../../app';
import {
  GET_FORMS,
  getForms,
} from '../actions';

const { searchEntitySetData } = SearchApiActions;
const { searchEntitySetDataWorker } = SearchApiSagas;

const { FORM } = AppTypes;
// const { REQUEST_DATE_TIME } = PropertyTypes;

const LOG = new Logger('getFormsSagas');

function* getFormsWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;

  try {
    yield put(getForms.request(action.id));

    const config = yield select((store) => store.getIn(APP_PATHS.APP_CONFIG));
    const formESID = getESIDFromConfig(config, FORM);

    const formsResponse :WorkerResponse = yield call(
      searchEntitySetDataWorker,
      searchEntitySetData({
        entitySetIds: [formESID],
        maxHits: 10000,
        start: 0,
        constraints: [{
          constraints: [{
            type: 'simple',
            searchTerm: 'Common Application',
            fuzzy: false
          }],
        }],
      })
    );

    if (formsResponse.error) throw formsResponse.error;
    response = { data: formsResponse.data };

    yield put(getForms.success(action.id, {
      forms: fromJS(formsResponse.data.hits)
    }));

  }
  catch (error) {
    response = { error };
    LOG.error(action.type, error);
    yield put(getForms.failure(action.id, error));
  }
  finally {
    yield put(getForms.finally(action.id));
  }
  return response;
}

function* getFormsWatcher() :Saga<void> {
  yield takeEvery(GET_FORMS, getFormsWorker);
}

export {
  getFormsWatcher,
  getFormsWorker,
};
