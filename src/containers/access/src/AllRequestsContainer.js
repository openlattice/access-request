// @flow
import styled from 'styled-components';
import { Button, Typography } from 'lattice-ui-kit';
import { Link } from 'react-router-dom';

import { useSelector } from '../../../core/redux';
import { getRelativeRoot } from '../../../utils/RouteUtils';

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AllRequestsContainer = () => {
  const root = useSelector((store) => store.getIn(['app', 'root']));
  const match = useSelector((store) => store.getIn(['app', 'match']));
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
    </div>
  );
};

export default AllRequestsContainer;
