// @flow
import React, { useEffect } from 'react';

import { Spinner } from 'lattice-ui-kit';
import { ValidationUtils } from 'lattice-utils';
import { Route, Switch } from 'react-router-dom';
import { RequestStates } from 'redux-reqseq';
import type { UUID } from 'lattice';
import type { Match } from 'react-router';

import AllRequestsContainer from './AllRequestsContainer';
import EditAccessRequestContainer from './EditAccessRequestContainer';
import NewRequestContainer from './NewRequestContainer';
import { CenterWrapper } from './styled';

import { useDispatch, useSelector } from '../../../core/redux';
import { INITIALIZE_APPLICATION, initializeApplication } from '../../app/actions';

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

  const initializeState = useSelector((state) => state.getIn(['app', INITIALIZE_APPLICATION, 'requestState']));
  if (initializeState === RequestStates.PENDING || initializeState === RequestStates.STANDBY) {
    return <CenterWrapper><Spinner size="3x" /></CenterWrapper>;
  }

  return (
    <Switch>
      <Route path={`${root}/new`} render={() => <NewRequestContainer />} />
      <Route path={`${root}/request/:accessId`} render={() => <EditAccessRequestContainer />} />
      <Route render={() => <AllRequestsContainer />} />
    </Switch>
  );
};

export default AccessRequestSwitch;
