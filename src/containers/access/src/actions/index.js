/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const GET_FORMS :'GET_FORMS' = 'GET_FORMS';
const getForms :RequestSequence = newRequestSequence(GET_FORMS);

const GET_ALL_ACCESS_REQUESTS :'GET_ALL_ACCESS_REQUESTS' = 'GET_ALL_ACCESS_REQUESTS';
const getAllAccessRequests :RequestSequence = newRequestSequence(GET_ALL_ACCESS_REQUESTS);

const SUBMIT_ACCESS_REQUEST :'SUBMIT_ACCESS_REQUEST' = 'SUBMIT_ACCESS_REQUEST';
const submitAccessRequest :RequestSequence = newRequestSequence(SUBMIT_ACCESS_REQUEST);

export {
  GET_ALL_ACCESS_REQUESTS,
  GET_FORMS,
  SUBMIT_ACCESS_REQUEST,
  getAllAccessRequests,
  getForms,
  submitAccessRequest,
};
