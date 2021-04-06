// @flow

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import {
  UPDATE_ATTACHMENT_TAG,
  updateAttachmentTag,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function updateAttachmentTagReducer(state :Map<*, *>, action :SequenceAction) {

  return updateAttachmentTag.reducer(state, action, {
    REQUEST: () => {
      const { path, tag } = action.value;
      return state
        .setIn(path, tag)
        .setIn([UPDATE_ATTACHMENT_TAG, REQUEST_STATE], RequestStates.PENDING);
    },
    SUCCESS: () => state.setIn([UPDATE_ATTACHMENT_TAG, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([UPDATE_ATTACHMENT_TAG, REQUEST_STATE], RequestStates.FAILURE),
  });
}
