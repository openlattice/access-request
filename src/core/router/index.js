/*
 * @flow
 */

import initializeRouterHistory from './RouterHistory';
import * as Routes from './Routes';
import * as RoutingActions from './actions';
import * as RoutingSagas from './RoutingSagas';

const routerHistory = initializeRouterHistory();

export {
  Routes,
  RoutingActions,
  RoutingSagas,
  routerHistory,
};
