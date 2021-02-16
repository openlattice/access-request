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

export default function reducer(state :Map<*, *>, action :Object) {

  switch (action.type) {

    case getAllAccessRequests.case(action.type): {
      const seqAction :SequenceAction = action;
      return getAllAccessRequests.reducer(state, seqAction, {
        REQUEST: () => state.setIn([GET_ALL_ACCESS_REQUESTS, REQUEST_STATE], RequestStates.PENDING),
        SUCCESS: () => state
          .merge(action.value)
          .setIn([GET_ALL_ACCESS_REQUESTS, REQUEST_STATE], RequestStates.SUCCESS),
        FAILURE: () => state.setIn([GET_ALL_ACCESS_REQUESTS, REQUEST_STATE], RequestStates.FAILURE),
      });
    }

    default:
      return state;
  }
}
