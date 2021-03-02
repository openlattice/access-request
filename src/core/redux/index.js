import { createContext } from 'react';

import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook
} from 'react-redux';

import initializeReduxStore from './ReduxStore';

import { routerHistory } from '../router';

export const moduleStore = initializeReduxStore(routerHistory);
export const moduleContext = createContext(null);

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(moduleContext);
export const useDispatch = createDispatchHook(moduleContext);
export const useSelector = createSelectorHook(moduleContext);
