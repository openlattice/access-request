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

export {
  CLEAR_ACCESS_REQUEST,
  GET_ALL_ACCESS_REQUESTS,
  GET_FORMS,
  SELECT_ACCESS_REQUEST,
  SUBMIT_ACCESS_REQUEST,
  UPDATE_ACCESS_REQUEST,
  clearAccessRequest,
  getAllAccessRequests,
  getForms,
  selectAccessRequest,
  submitAccessRequest,
  updateAccessRequest,
};
