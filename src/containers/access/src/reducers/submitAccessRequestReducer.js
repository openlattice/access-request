/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import {
  SUBMIT_ACCESS_REQUEST,
  submitAccessRequest,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function submitAccessRequestReducer(state :Map<*, *>, action :SequenceAction) {

  return submitAccessRequest.reducer(state, action, {
    REQUEST: () => state.setIn([SUBMIT_ACCESS_REQUEST, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => state
      .merge(action.value)
      .setIn([SUBMIT_ACCESS_REQUEST, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([SUBMIT_ACCESS_REQUEST, REQUEST_STATE], RequestStates.FAILURE),
  });

}
