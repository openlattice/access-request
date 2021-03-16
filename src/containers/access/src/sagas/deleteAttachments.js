// @flow
import {
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { Logger, ValidationUtils } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { deleteBulkEntities } from '../../../../core/actions';
import { AppTypes } from '../../../../core/edm/constants';
import { deleteBulkEntitiesWorker } from '../../../../core/sagas/data/deleteBulkEntities';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import { APP_PATHS } from '../../../app';
import { DELETE_ATTACHMENTS, deleteAttachments } from '../actions';

const { isValidUUID } = ValidationUtils;

const { FILE } = AppTypes;

const LOG = new Logger('AccessSagas');

function* deleteAttachmentsWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response = {};
  try {
    const { value } = action;
    if (Array.isArray(value) && !value.every(isValidUUID)) throw ERR_ACTION_VALUE_TYPE;

    yield put(deleteAttachments.request(action.id));

    const config = yield select((store) => store.getIn(APP_PATHS.APP_CONFIG));
    const fileESID = getESIDFromConfig(config, FILE);

    const entityData = {
      [fileESID]: value
    };

    const deleteResponse = yield call(deleteBulkEntitiesWorker, deleteBulkEntities(entityData));
    if (deleteResponse.error) throw deleteResponse.error;
    response = { data: entityData };

    yield put(deleteAttachments.success(action.id, value));
  }
  catch (error) {
    LOG.error(action.type, error);
    response = { error };
    yield put(deleteAttachments.failure(action.id, error));
  }
  finally {
    yield put(deleteAttachments.finally(action.id));
  }
  return response;
}

function* deleteAttachmentsWatcher() :Saga<void> {
  yield takeEvery(DELETE_ATTACHMENTS, deleteAttachmentsWorker);
}

export { deleteAttachmentsWorker, deleteAttachmentsWatcher };