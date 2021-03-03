// @flow

import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';

import { moduleContext, moduleStore } from '../redux';
import { routerHistory } from '../router';

type Props = {
  children :any;
}

export default function ModuleProvider({ children } :Props) {
  return (
    <Provider context={moduleContext} store={moduleStore}>
      <ConnectedRouter history={routerHistory} context={moduleContext}>
        {children}
      </ConnectedRouter>
    </Provider>
  );
}
