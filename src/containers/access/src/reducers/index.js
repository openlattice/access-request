/*
 * @flow
 */

import { Map, fromJS } from 'immutable';

import getAllAccessRequestsReducer from './getAllAccessRequestsReducer';
import getFormsReducer from './getFormsReducer';
import submitAccessRequestReducer from './submitAccessRequestReducer';

import { RESET_REQUEST_STATE } from '../../../../core/redux/actions';
import { RS_INITIAL_STATE } from '../../../../core/redux/constants';
import { resetRequestStateReducer } from '../../../../core/redux/reducers';
import {
  GET_ALL_ACCESS_REQUESTS,
  GET_FORMS,
  SUBMIT_ACCESS_REQUEST,
  getAllAccessRequests,
  getForms,
  submitAccessRequest,
} from '../actions';

const INITIAL_STATE :Map = fromJS({
  [GET_ALL_ACCESS_REQUESTS]: RS_INITIAL_STATE,
  [GET_FORMS]: RS_INITIAL_STATE,
  [SUBMIT_ACCESS_REQUEST]: RS_INITIAL_STATE,
});

export default function reducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case RESET_REQUEST_STATE: {
      return resetRequestStateReducer(state, action);
    }

    case getForms.case(action.type): {
      return getFormsReducer(state, action);
    }

    case getAllAccessRequests.case(action.type): {
      return getAllAccessRequestsReducer(state, action);
    }

    case submitAccessRequest.case(action.type): {
      return submitAccessRequestReducer(state, action);
    }

    default:
      return state;
  }
}
