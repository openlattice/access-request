/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const INITIALIZE_APPLICATION :'INITIALIZE_APPLICATION' = 'INITIALIZE_APPLICATION';
const initializeApplication :RequestSequence = newRequestSequence(INITIALIZE_APPLICATION);

const SET_ROOT :'SET_ROOT' = 'SET_ROOT';
const setRoot = (value :string) => ({
  type: SET_ROOT,
  value
});

export {
  INITIALIZE_APPLICATION,
  initializeApplication,
  SET_ROOT,
  setRoot,
};
