/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import { ReduxConstants } from 'lattice-utils';

import getAllAccessRequestsReducer from './getAllAccessRequestsReducer';
import getFormsReducer from './getFormsReducer';
import submitAccessRequestReducer from './submitAccessRequestReducer';
import updateAccessRequestReducer from './updateAccessRequestReducer';

import { RESET_REQUEST_STATE } from '../../../../core/redux/actions';
import { RS_INITIAL_STATE } from '../../../../core/redux/constants';
import { resetRequestStateReducer } from '../../../../core/redux/reducers';
import {
  CLEAR_ACCESS_REQUEST,
  GET_ALL_ACCESS_REQUESTS,
  GET_FORMS,
  SELECT_ACCESS_REQUEST,
  SUBMIT_ACCESS_REQUEST,
  UPDATE_ACCESS_REQUEST,
  getAllAccessRequests,
  getForms,
  submitAccessRequest,
  updateAccessRequest,
} from '../actions';

const { HITS } = ReduxConstants;

const INITIAL_STATE :Map = fromJS({
  [GET_ALL_ACCESS_REQUESTS]: RS_INITIAL_STATE,
  [GET_FORMS]: RS_INITIAL_STATE,
  [SUBMIT_ACCESS_REQUEST]: RS_INITIAL_STATE,
  [UPDATE_ACCESS_REQUEST]: RS_INITIAL_STATE,
  accessRequest: Map(),
  [HITS]: List([]),
});

export default function reducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case RESET_REQUEST_STATE: {
      return resetRequestStateReducer(state, action);
    }

    case SELECT_ACCESS_REQUEST: {
      return state.set('accessRequest', action.value);
    }

    case CLEAR_ACCESS_REQUEST: {
      return state.set('accessRequest', INITIAL_STATE.get('accessRequest'));
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

    case updateAccessRequest.case(action.type): {
      return updateAccessRequestReducer(state, action);
    }

    default:
      return state;
  }
}
