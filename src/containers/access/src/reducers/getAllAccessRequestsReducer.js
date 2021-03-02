/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import {
  GET_ALL_ACCESS_REQUESTS,
  getAllAccessRequests,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function getAllAccessRequestsReducer(state :Map<*, *>, action :SequenceAction) {
  return getAllAccessRequests.reducer(state, action, {
    REQUEST: () => state.setIn([GET_ALL_ACCESS_REQUESTS, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => state
      .merge(action.value)
      .setIn([GET_ALL_ACCESS_REQUESTS, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([GET_ALL_ACCESS_REQUESTS, REQUEST_STATE], RequestStates.FAILURE),
  });
}
