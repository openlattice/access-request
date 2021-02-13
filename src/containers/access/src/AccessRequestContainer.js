// @flow

import type { UUID } from 'lattice';
import type { Match } from 'react-router';

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
      <div>test</div>
    </ModuleProvider>
  );
};

export default AccessRequestContainer;
