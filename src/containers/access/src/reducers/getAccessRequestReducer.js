/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import {
  GET_ACCESS_REQUEST,
  getAccessRequest,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function getAccessRequestReducer(state :Map<*, *>, action :SequenceAction) {
  return getAccessRequest.reducer(state, action, {
    REQUEST: () => state.setIn([GET_ACCESS_REQUEST, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => state
      .merge(action.value)
      .setIn([GET_ACCESS_REQUEST, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([GET_ACCESS_REQUEST, REQUEST_STATE], RequestStates.FAILURE),
  });
}
