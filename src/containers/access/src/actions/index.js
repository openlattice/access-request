/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';
import type { Map } from 'immutable';
import type { RequestSequence } from 'redux-reqseq';

const GET_FORMS :'GET_FORMS' = 'GET_FORMS';
const getForms :RequestSequence = newRequestSequence(GET_FORMS);

const GET_ALL_ACCESS_REQUESTS :'GET_ALL_ACCESS_REQUESTS' = 'GET_ALL_ACCESS_REQUESTS';
const getAllAccessRequests :RequestSequence = newRequestSequence(GET_ALL_ACCESS_REQUESTS);

const GET_ACCESS_REQUEST :'GET_ACCESS_REQUEST' = 'GET_ACCESS_REQUEST';
const getAccessRequest :RequestSequence = newRequestSequence(GET_ACCESS_REQUEST);

const SUBMIT_ACCESS_REQUEST :'SUBMIT_ACCESS_REQUEST' = 'SUBMIT_ACCESS_REQUEST';
const submitAccessRequest :RequestSequence = newRequestSequence(SUBMIT_ACCESS_REQUEST);

const SELECT_ACCESS_REQUEST :'SELECT_ACCESS_REQUEST' = 'SELECT_ACCESS_REQUEST';
const selectAccessRequest = (value :Map) => ({
  type: SELECT_ACCESS_REQUEST,
  value
});

const CLEAR_ACCESS_REQUEST :'CLEAR_ACCESS_REQUEST' = 'CLEAR_ACCESS_REQUEST';
const clearAccessRequest = () => ({
  type: CLEAR_ACCESS_REQUEST
});

const UPDATE_ACCESS_REQUEST :'UPDATE_ACCESS_REQUEST' = 'UPDATE_ACCESS_REQUEST';
const updateAccessRequest :RequestSequence = newRequestSequence(UPDATE_ACCESS_REQUEST);

const GET_ATTACHMENTS :'GET_ATTACHMENTS' = 'GET_ATTACHMENTS';
const getAttachments :RequestSequence = newRequestSequence(GET_ATTACHMENTS);

const UPLOAD_ATTACHMENTS :'UPLOAD_ATTACHMENTS' = 'UPLOAD_ATTACHMENTS';
const uploadAttachments :RequestSequence = newRequestSequence(UPLOAD_ATTACHMENTS);

const DELETE_ATTACHMENTS :'DELETE_ATTACHMENTS' = 'DELETE_ATTACHMENTS';
const deleteAttachments :RequestSequence = newRequestSequence(DELETE_ATTACHMENTS);

export {
  CLEAR_ACCESS_REQUEST,
  DELETE_ATTACHMENTS,
  GET_ACCESS_REQUEST,
  GET_ALL_ACCESS_REQUESTS,
  GET_ATTACHMENTS,
  GET_FORMS,
  SELECT_ACCESS_REQUEST,
  SUBMIT_ACCESS_REQUEST,
  UPDATE_ACCESS_REQUEST,
  UPLOAD_ATTACHMENTS,
  clearAccessRequest,
  deleteAttachments,
  getAccessRequest,
  getAllAccessRequests,
  getAttachments,
  getForms,
  selectAccessRequest,
  submitAccessRequest,
  updateAccessRequest,
  uploadAttachments,
};
