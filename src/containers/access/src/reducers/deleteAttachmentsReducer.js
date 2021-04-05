// @flow

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import { ATTACHMENTS } from './constants';

import {
  DELETE_ATTACHMENTS,
  deleteAttachments,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function deleteAttachmentsReducer(state :Map<*, *>, action :SequenceAction) {
  return deleteAttachments.reducer(state, action, {
    REQUEST: () => state.setIn([DELETE_ATTACHMENTS, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => {
      const { value } = action;
      const remainingAttachments = state.get(ATTACHMENTS).deleteAll(value);

      return state
        .set(ATTACHMENTS, remainingAttachments)
        .setIn([DELETE_ATTACHMENTS, REQUEST_STATE], RequestStates.SUCCESS);
    },
    FAILURE: () => state.setIn([DELETE_ATTACHMENTS, REQUEST_STATE], RequestStates.FAILURE),
  });
}
