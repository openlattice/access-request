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

import { getAttachmentsWorker } from './getAttachments';
import { updateAccessRequestWorker } from './updateAccessRequest';
import { uploadAttachmentsWorker } from './uploadAttachments';

import {
  UPLOAD_FIELD_ATTACHMENT,
  getAttachments,
  updateAccessRequest,
  uploadAttachments,
  uploadFieldAttachment
} from '../actions';

const LOG = new Logger('DocumentsSagas');

function* uploadFieldAttachmentWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;

  try {
    yield put(uploadFieldAttachment.request(action.id));

    const {
      accessRequestId,
      file,
      formData,
      groupId,
    } = action.value;

    const uploadAttachmentsRequest = call(
      uploadAttachmentsWorker,
      uploadAttachments({
        files: [file],
        accessRequestId,
        groupId,
      })
    );

    const updateAccessRequestRequest = call(
      updateAccessRequestWorker,
      updateAccessRequest({
        formData,
        entityKeyId: accessRequestId,
      })
    );

    const [uploadAttachmentResponse, updateAccessRequestResponse] = yield all([
      uploadAttachmentsRequest,
      updateAccessRequestRequest,
    ]);

    if (uploadAttachmentResponse.error) throw uploadAttachmentResponse.error;
    if (updateAccessRequestResponse.error) throw updateAccessRequestResponse.error;

    response = { data: {} };

    yield call(getAttachmentsWorker, getAttachments(accessRequestId));

    yield put(uploadFieldAttachment.success(action.id));
  }
  catch (error) {
    LOG.error(action.type, error);
    response = { error };
    yield put(uploadFieldAttachment.failure(action.id, error));
  }
  finally {
    yield put(uploadFieldAttachment.finally(action.id));
  }

  return response;
}

function* uploadFieldAttachmentWatcher() :Saga<void> {
  yield takeEvery(UPLOAD_FIELD_ATTACHMENT, uploadFieldAttachmentWorker);
}

export {
  uploadFieldAttachmentWatcher,
  uploadFieldAttachmentWorker,
};
