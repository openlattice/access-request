// @flow

import type { UUID } from 'lattice';
import type { Match } from 'react-router';

import AccessRequestSwitch from './AccessRequestSwitch';

import ModuleProvider from '../../../core/provider/ModuleProvider';

type Props = {
  match :Match;
  organizationId :UUID;
  root :string;
};

const AccessRequestContainer = (props :Props) => {
  const {
    match,
    organizationId,
    root,
  } = props;

  return (
    <ModuleProvider>
      <AccessRequestSwitch
          match={match}
          organizationId={organizationId}
          root={root} />
    </ModuleProvider>
  );
};

export default AccessRequestContainer;
