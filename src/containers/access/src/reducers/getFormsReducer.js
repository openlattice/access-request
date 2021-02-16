/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import {
  GET_FORMS,
  getForms,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function reducer(state :Map<*, *>, action :Object) {

  switch (action.type) {

    case getForms.case(action.type): {
      const seqAction :SequenceAction = action;
      return getForms.reducer(state, seqAction, {
        REQUEST: () => state.setIn([GET_FORMS, REQUEST_STATE], RequestStates.PENDING),
        SUCCESS: () => state
          .merge(action.value)
          .setIn([GET_FORMS, REQUEST_STATE], RequestStates.SUCCESS),
        FAILURE: () => state.setIn([GET_FORMS, REQUEST_STATE], RequestStates.FAILURE),
      });
    }

    default:
      return state;
  }
}
