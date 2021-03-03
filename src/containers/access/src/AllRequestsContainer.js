// @flow
import styled from 'styled-components';
import { Button, Typography } from 'lattice-ui-kit';
import { Link } from 'react-router-dom';

import AccessRequestList from './AccessRequestList';

import getRelativeRoot from '../../../utils/getRelativeRoot';
import { useSelector } from '../../../core/redux';
import { APP_PATHS } from '../../app';

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AllRequestsContainer = () => {
  const root = useSelector((store) => store.getIn(APP_PATHS.ROOT));
  const match = useSelector((store) => store.getIn(APP_PATHS.MATCH));
  const relRoot = getRelativeRoot(root, match);

  return (
    <div>
      <HeaderRow>
        <Typography variant="h1">Access Requests</Typography>
        <Button
            color="primary"
            component={Link}
            to={`${relRoot}/new`}>
          New Request
        </Button>
      </HeaderRow>
      <AccessRequestList />
    </div>
  );
};

export default AllRequestsContainer;
