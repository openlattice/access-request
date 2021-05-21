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

const CLEAR_ATTACHMENTS :'CLEAR_ATTACHMENTS' = 'CLEAR_ATTACHMENTS';
const clearAttachments = () => ({
  type: CLEAR_ATTACHMENTS
});

const UPDATE_ACCESS_REQUEST :'UPDATE_ACCESS_REQUEST' = 'UPDATE_ACCESS_REQUEST';
const updateAccessRequest :RequestSequence = newRequestSequence(UPDATE_ACCESS_REQUEST);

const GET_ATTACHMENTS :'GET_ATTACHMENTS' = 'GET_ATTACHMENTS';
const getAttachments :RequestSequence = newRequestSequence(GET_ATTACHMENTS);

const UPLOAD_ATTACHMENTS :'UPLOAD_ATTACHMENTS' = 'UPLOAD_ATTACHMENTS';
const uploadAttachments :RequestSequence = newRequestSequence(UPLOAD_ATTACHMENTS);

const DELETE_ATTACHMENTS :'DELETE_ATTACHMENTS' = 'DELETE_ATTACHMENTS';
const deleteAttachments :RequestSequence = newRequestSequence(DELETE_ATTACHMENTS);

const SAVE_NEW_FORM_TEMPLATE :'SAVE_NEW_FORM_TEMPLATE' = 'SAVE_NEW_FORM_TEMPLATE';
const saveNewFormTemplate :RequestSequence = newRequestSequence(SAVE_NEW_FORM_TEMPLATE);

const UPDATE_ATTACHMENT_TAG :'UPDATE_ATTACHMENT_TAG' = 'UPDATE_ATTACHMENT_TAG';
const updateAttachmentTag :RequestSequence = newRequestSequence(UPDATE_ATTACHMENT_TAG);

const UPLOAD_FIELD_ATTACHMENT :'UPLOAD_FIELD_ATTACHMENT' = 'UPLOAD_FIELD_ATTACHMENT';
const uploadFieldAttachment :RequestSequence = newRequestSequence(UPLOAD_FIELD_ATTACHMENT);

const DELETE_FIELD_ATTACHMENT :'DELETE_FIELD_ATTACHMENT' = 'DELETE_FIELD_ATTACHMENT';
const deleteFieldAttachment :RequestSequence = newRequestSequence(DELETE_FIELD_ATTACHMENT);

export {
  CLEAR_ACCESS_REQUEST,
  CLEAR_ATTACHMENTS,
  DELETE_ATTACHMENTS,
  DELETE_FIELD_ATTACHMENT,
  GET_ACCESS_REQUEST,
  GET_ALL_ACCESS_REQUESTS,
  GET_ATTACHMENTS,
  GET_FORMS,
  SAVE_NEW_FORM_TEMPLATE,
  SELECT_ACCESS_REQUEST,
  SUBMIT_ACCESS_REQUEST,
  UPDATE_ACCESS_REQUEST,
  UPDATE_ATTACHMENT_TAG,
  UPLOAD_ATTACHMENTS,
  UPLOAD_FIELD_ATTACHMENT,
  clearAccessRequest,
  clearAttachments,
  deleteAttachments,
  deleteFieldAttachment,
  getAccessRequest,
  getAllAccessRequests,
  getAttachments,
  getForms,
  saveNewFormTemplate,
  selectAccessRequest,
  submitAccessRequest,
  updateAccessRequest,
  updateAttachmentTag,
  uploadAttachments,
  uploadFieldAttachment,
};
