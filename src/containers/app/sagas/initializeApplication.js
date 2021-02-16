/*
 * @flow
 */

import {
  call,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import {
  AppApiActions,
  AppApiSagas,
} from 'lattice-sagas';
import { LangUtils, Logger, ValidationUtils } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { SequenceAction } from 'redux-reqseq';

import { ERR_ACTION_VALUE_TYPE } from '../../../utils/Errors';
import { INITIALIZE_APPLICATION, initializeApplication } from '../actions';

const { getApp, getAppConfigs } = AppApiActions;
const { getAppWorker, getAppConfigsWorker } = AppApiSagas;

const { isValidUUID } = ValidationUtils;
const { isDefined } = LangUtils;

const LOG = new Logger('AppSagas');

const APP_NAME = 'access_requests';

function* initializeApplicationWorker(action :SequenceAction) :Saga<*> {

  const workerResponse :Object = {};
  try {
    const { value: { match, organizationId, root } } = action;
    if (!isValidUUID(organizationId)) throw ERR_ACTION_VALUE_TYPE;
    if (typeof root !== 'string') throw ERR_ACTION_VALUE_TYPE;
    if (!isDefined(match)) throw ERR_ACTION_VALUE_TYPE;
    yield put(initializeApplication.request(action.id));

    /*
     * 1. load App
     */
    const response :any = yield call(getAppWorker, getApp(APP_NAME));
    if (response.error) throw response.error;

    /*
     * 2. load AppConfig, AppTypes
     */

    const app = response.data;
    const appConfigsResponse = yield call(getAppConfigsWorker, getAppConfigs(app.id));
    if (appConfigsResponse.error) throw appConfigsResponse.error;
    const appConfig = appConfigsResponse.data.reduce((acc, config) => {
      let selectedConfig = acc;
      if (config.organization.id === organizationId) {
        selectedConfig = config;
      }
      return selectedConfig;
    }, {});

    workerResponse.data = {
      appConfig,
      root,
      match,
    };

    yield put(initializeApplication.success(action.id, workerResponse.data));
  }
  catch (error) {
    LOG.error(action.type, error);
    yield put(initializeApplication.failure(action.id, error));
  }
  finally {
    yield put(initializeApplication.finally(action.id));
  }
}

function* initializeApplicationWatcher() :Saga<*> {

  yield takeEvery(INITIALIZE_APPLICATION, initializeApplicationWorker);
}

export {
  initializeApplicationWatcher,
  initializeApplicationWorker,
};
