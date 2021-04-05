/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import { ReduxConstants } from 'lattice-utils';

import deleteAttachmentsReducer from './deleteAttachmentsReducer';
import getAccessRequestReducer from './getAccessRequestReducer';
import getAllAccessRequestsReducer from './getAllAccessRequestsReducer';
import getAttachmentsReducer from './getAttachmentsReducer';
import getFormsReducer from './getFormsReducer';
import submitAccessRequestReducer from './submitAccessRequestReducer';
import updateAccessRequestReducer from './updateAccessRequestReducer';
import updateAttachmentTagReducer from './updateAttachmentTagReducer';
import uploadAttachmentsReducer from './uploadAttachmentsReducer';
import { ACCESS_REQUEST, ATTACHMENTS, FORMS } from './constants';

import { RESET_REQUEST_STATE } from '../../../../core/redux/actions';
import { RS_INITIAL_STATE } from '../../../../core/redux/constants';
import { resetRequestStateReducer } from '../../../../core/redux/reducers';
import {
  CLEAR_ACCESS_REQUEST,
  GET_ALL_ACCESS_REQUESTS,
  GET_ATTACHMENTS,
  GET_FORMS,
  SELECT_ACCESS_REQUEST,
  SUBMIT_ACCESS_REQUEST,
  UPDATE_ACCESS_REQUEST,
  UPLOAD_ATTACHMENTS,
  deleteAttachments,
  getAccessRequest,
  getAllAccessRequests,
  getAttachments,
  getForms,
  submitAccessRequest,
  updateAccessRequest,
  updateAttachmentTag,
  uploadAttachments,
} from '../actions';

const { HITS } = ReduxConstants;

const INITIAL_STATE :Map = fromJS({
  [ACCESS_REQUEST]: Map(),
  [ATTACHMENTS]: Map(),
  [FORMS]: List(),
  [GET_ALL_ACCESS_REQUESTS]: RS_INITIAL_STATE,
  [GET_ATTACHMENTS]: RS_INITIAL_STATE,
  [GET_FORMS]: RS_INITIAL_STATE,
  [HITS]: List(),
  [SUBMIT_ACCESS_REQUEST]: RS_INITIAL_STATE,
  [UPDATE_ACCESS_REQUEST]: RS_INITIAL_STATE,
  [UPLOAD_ATTACHMENTS]: RS_INITIAL_STATE,
});

export default function reducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case RESET_REQUEST_STATE: {
      return resetRequestStateReducer(state, action);
    }

    case SELECT_ACCESS_REQUEST: {
      return state.set(ACCESS_REQUEST, action.value);
    }

    case CLEAR_ACCESS_REQUEST: {
      return state.set(ACCESS_REQUEST, INITIAL_STATE.get(ACCESS_REQUEST));
    }

    case getForms.case(action.type): {
      return getFormsReducer(state, action);
    }

    case getAccessRequest.case(action.type): {
      return getAccessRequestReducer(state, action);
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

    case getAttachments.case(action.type): {
      return getAttachmentsReducer(state, action);
    }

    case uploadAttachments.case(action.type): {
      return uploadAttachmentsReducer(state, action);
    }

    case deleteAttachments.case(action.type): {
      return deleteAttachmentsReducer(state, action);
    }

    case updateAttachmentTag.case(action.type): {
      return updateAttachmentTagReducer(state, action);
    }

    default:
      return state;
  }
}
