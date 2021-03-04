// @flow
import React, { useEffect } from 'react';

import { Spinner } from 'lattice-ui-kit';
import { ReduxUtils, ValidationUtils } from 'lattice-utils';
import { Route, Switch } from 'react-router-dom';
import type { UUID } from 'lattice';
import type { Match } from 'react-router';

import AllRequestsContainer from './AllRequestsContainer';
import EditAccessRequestContainer from './EditAccessRequestContainer';
import NewRequestContainer from './NewRequestContainer';
import { CenterWrapper } from './styled';

import { useDispatch, useSelector } from '../../../core/redux';
import { APP, REQUEST_STATE } from '../../../core/redux/constants';
import { ACCESS_REQUEST_PATH } from '../../../core/router/Routes';
import { INITIALIZE_APPLICATION, initializeApplication } from '../../app/actions';

const { isPending, isStandby } = ReduxUtils;

const { isValidUUID } = ValidationUtils;

type Props = {
  match :Match;
  organizationId :UUID;
  root :string;
};

const AccessRequestSwitch = ({
  match,
  organizationId,
  root,
} :Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isValidUUID(organizationId)) {
      dispatch(initializeApplication({ match, organizationId, root }));
    }
    // do NOT reinitialize whenever match updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, organizationId, root]);

  const initializeState = useSelector((state) => state.getIn([APP, INITIALIZE_APPLICATION, REQUEST_STATE]));
  if (isPending(initializeState) || isStandby(initializeState)) {
    return <CenterWrapper><Spinner size="2x" /></CenterWrapper>;
  }

  return (
    <Switch>
      <Route path={`${root}/new`} render={() => <NewRequestContainer />} />
      <Route path={`${root}${ACCESS_REQUEST_PATH}`} render={() => <EditAccessRequestContainer />} />
      <Route render={() => <AllRequestsContainer />} />
    </Switch>
  );
};

export default AccessRequestSwitch;
