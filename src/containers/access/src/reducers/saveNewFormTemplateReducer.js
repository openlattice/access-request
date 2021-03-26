/*
 * @flow
 */

import { Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import {
  SAVE_NEW_FORM_TEMPLATE,
  saveNewFormTemplate,
} from '../actions';

const { REQUEST_STATE } = ReduxConstants;

export default function saveNewFormTemplateReducer(state :Map<*, *>, action :SequenceAction) {

  return saveNewFormTemplate.reducer(state, action, {
    REQUEST: () => state.setIn([SAVE_NEW_FORM_TEMPLATE, REQUEST_STATE], RequestStates.PENDING),
    SUCCESS: () => state
      .merge(action.value)
      .setIn([SAVE_NEW_FORM_TEMPLATE, REQUEST_STATE], RequestStates.SUCCESS),
    FAILURE: () => state.setIn([SAVE_NEW_FORM_TEMPLATE, REQUEST_STATE], RequestStates.FAILURE),
  });
}
