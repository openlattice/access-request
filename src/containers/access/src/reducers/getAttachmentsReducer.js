/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import { ATTACHMENTS } from './constants';

import {
  GET_ATTACHMENTS,
  getAttachments,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function getAttachmentsReducer(state :Map<*, *>, action :SequenceAction) {

  return getAttachments.reducer(state, action, {
    REQUEST: () => state.setIn([GET_ATTACHMENTS, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => {
      const { data } = action.value;
      return state
        .set(ATTACHMENTS, data)
        .setIn([GET_ATTACHMENTS, REQUEST_STATE], RequestStates.SUCCESS);
    },
    FAILURE: () => state.setIn([GET_ATTACHMENTS, REQUEST_STATE], RequestStates.FAILURE),
  });

}
