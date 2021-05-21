// @flow

import {
  all,
  call,
  put,
  takeEvery
} from '@redux-saga/core/effects';
import { Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import { deleteAttachmentsWorker } from './deleteAttachments';
import { updateAccessRequestWorker } from './updateAccessRequest';

import {
  DELETE_FIELD_ATTACHMENT,
  deleteAttachments,
  deleteFieldAttachment,
  updateAccessRequest
} from '../actions';

const LOG = new Logger('DocumentsSagas');

function* deleteFieldAttachmentWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;

  try {
    yield put(deleteFieldAttachment.request(action.id));

    const {
      accessRequestId,
      attachment,
      formData,
    } = action.value;

    const deleteAttachmentsRequest = call(
      deleteAttachmentsWorker,
      deleteAttachments([attachment.id])
    );

    const updateAccessRequestRequest = call(
      updateAccessRequestWorker,
      updateAccessRequest({
        formData,
        entityKeyId: accessRequestId,
      })
    );

    const [deleteAttachmentResponse, updateAccessRequestResponse] = yield all([
      deleteAttachmentsRequest,
      updateAccessRequestRequest,
    ]);

    if (deleteAttachmentResponse.error) throw deleteAttachmentResponse.error;
    if (updateAccessRequestResponse.error) throw updateAccessRequestResponse.error;

    response = { data: {} };

    yield put(deleteFieldAttachment.success(action.id));
  }
  catch (error) {
    LOG.error(action.type, error);
    response = { error };
    yield put(deleteFieldAttachment.failure(action.id, error));
  }
  finally {
    yield put(deleteFieldAttachment.finally(action.id));
  }

  return response;
}

function* deleteFieldAttachmentWatcher() :Saga<void> {
  yield takeEvery(DELETE_FIELD_ATTACHMENT, deleteFieldAttachmentWorker);
}

export {
  deleteFieldAttachmentWatcher,
  deleteFieldAttachmentWorker,
};
