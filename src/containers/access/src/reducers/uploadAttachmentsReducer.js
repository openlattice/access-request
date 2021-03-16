/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import { ACCESS_REQUEST } from './constants';

import {
  UPLOAD_ATTACHMENTS,
  uploadAttachments,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function uploadAttachmentsReducer(state :Map<*, *>, action :SequenceAction) {

  return uploadAttachments.reducer(state, action, {
    REQUEST: () => state.setIn([UPLOAD_ATTACHMENTS, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => state
      .set(ACCESS_REQUEST, action.value)
      .setIn([UPLOAD_ATTACHMENTS, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([UPLOAD_ATTACHMENTS, REQUEST_STATE], RequestStates.FAILURE),
  });

}
