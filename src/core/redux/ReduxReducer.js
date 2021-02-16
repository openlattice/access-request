/*
 * @flow
 */

import { connectRouter } from 'connected-react-router/immutable';
import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';

import {
  ACCESS,
  APP,
  AUTH,
  EDM,
} from './constants';

import AcccessRequestReducer from '../../containers/access/src/reducers';
import { AppReducer } from '../../containers/app';
import { EDMReducer } from '../edm';

export default function reducer(routerHistory :any) {

  return combineReducers({
    [ACCESS]: AcccessRequestReducer,
    [APP]: AppReducer,
    [AUTH]: AuthReducer,
    [EDM]: EDMReducer,
    router: connectRouter(routerHistory),
  });
}
