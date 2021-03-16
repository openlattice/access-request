/*
 * @flow
 */

import { all, fork } from '@redux-saga/core/effects';
import { AuthSagas } from 'lattice-auth';
import type { Saga } from '@redux-saga/core';

import * as AccessSagas from '../../containers/access/src/sagas';
import { AppSagas } from '../../containers/app/sagas';
import { EDMSagas } from '../edm';
import { RoutingSagas } from '../router';

export default function* sagas() :Saga<*> {

  yield all([
    // "lattice-auth" sagas
    fork(AuthSagas.watchAuthAttempt),
    fork(AuthSagas.watchAuthSuccess),
    fork(AuthSagas.watchAuthFailure),
    fork(AuthSagas.watchAuthExpired),
    fork(AuthSagas.watchLogout),

    // AppSagas
    fork(AppSagas.initializeApplicationWatcher),

    // EDMSagas
    fork(EDMSagas.getEntityDataModelTypesWatcher),

    // RoutingSagas
    fork(RoutingSagas.goToRootWatcher),
    fork(RoutingSagas.goToRouteWatcher),

    fork(AccessSagas.getAccessRequestWatcher),
    fork(AccessSagas.getAttachmentsWatcher),
    fork(AccessSagas.getAllAccessRequestsWatcher),
    fork(AccessSagas.submitAccessRequestWatcher),
    fork(AccessSagas.updateAccessRequestWatcher),
    fork(AccessSagas.uploadAttachmentsWatcher),
    fork(AccessSagas.deleteAttachmentsWatcher),
  ]);
}
