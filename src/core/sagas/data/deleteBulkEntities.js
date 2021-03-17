/*
 * @flow
 */

import {
  all,
  call,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import { Types } from 'lattice';
import { DataApiActions, DataApiSagas } from 'lattice-sagas';
import { Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import { ERR_ACTION_VALUE_NOT_DEFINED } from '../../../utils/Errors';
import {
  DELETE_BULK_ENTITIES,
  deleteBulkEntities,
} from '../../actions';

const LOG = new Logger('DataSagas');

const { DeleteTypes } = Types;
const { deleteEntityData } = DataApiActions;
const { deleteEntityDataWorker } = DataApiSagas;

function* deleteBulkEntitiesWorker(action :SequenceAction) :Saga<WorkerResponse> {

  const sagaResponse :Object = {};

  try {
    const { value } = action;
    if (value === null || value === undefined) throw ERR_ACTION_VALUE_NOT_DEFINED;

    yield put(deleteBulkEntities.request(action.id));
    const deleteRequests = Object.keys(value).map((entitySetId) => {
      const entityKeyIds = Array.from(value[entitySetId]);

      return call(
        deleteEntityDataWorker,
        deleteEntityData({
          entitySetId,
          entityKeyIds,
          deleteType: DeleteTypes.SOFT
        })
      );
    });

    const deleteResponses = yield all(deleteRequests);
    const reducedError = deleteResponses.reduce((acc, response) => {
      acc.error = acc.error || response.error;
      return acc;
    }, {});
    if (reducedError.error) throw reducedError;

    yield put(deleteBulkEntities.success(action.id));
  }
  catch (error) {
    LOG.error(action.type, error);
    sagaResponse.error = error;
    yield put(deleteBulkEntities.failure(action.id, error));
  }
  finally {
    yield put(deleteBulkEntities.finally(action.id));
  }

  return sagaResponse;
}

function* deleteBulkEntitiesWatcher() :Saga<void> {
  yield takeEvery(DELETE_BULK_ENTITIES, deleteBulkEntitiesWorker);
}

export {
  deleteBulkEntitiesWorker,
  deleteBulkEntitiesWatcher,
};
