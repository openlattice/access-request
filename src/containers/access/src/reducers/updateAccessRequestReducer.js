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

export default function reducer(state :Map<*, *>, action :Object) {

  switch (action.type) {

    case updateAccessRequest.case(action.type): {
      const seqAction :SequenceAction = action;
      return updateAccessRequest.reducer(state, seqAction, {
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

    default:
      return state;
  }
}
