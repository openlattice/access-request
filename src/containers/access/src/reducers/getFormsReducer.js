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

export default function getFormsReducer(state :Map<*, *>, action :SequenceAction) {

  return getForms.reducer(state, action, {
    REQUEST: () => state.setIn([GET_FORMS, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => state
      .merge(action.value)
      .setIn([GET_FORMS, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([GET_FORMS, REQUEST_STATE], RequestStates.FAILURE),
  });
}
