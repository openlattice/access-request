/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import {
  UPDATE_ACCESS_REQUEST,
  updateAccessRequest,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function updateAccessRequestReducer(state :Map<*, *>, action :SequenceAction) {

  return updateAccessRequest.reducer(state, action, {
    REQUEST: () => {
      const { path, formData } = action.value;
      return state
        .setIn(path, formData)
        .setIn([UPDATE_ACCESS_REQUEST, REQUEST_STATE], RequestStates.PENDING);
    },
    SUCCESS: () => state.setIn([UPDATE_ACCESS_REQUEST, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([UPDATE_ACCESS_REQUEST, REQUEST_STATE], RequestStates.FAILURE),
  });
}
