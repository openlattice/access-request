// @flow
import { Link } from 'react-router-dom';

import { useSelector } from '../../../core/redux';
import { getRelativeRoot } from '../../../utils/RouteUtils';

const AllRequestsContainer = () => {
  const root = useSelector((store) => store.getIn(['app', 'root']));
  const match = useSelector((store) => store.getIn(['app', 'match']));
  const relRoot = getRelativeRoot(root, match);

  return (
    <div>
      all requests
      <Link
          to={`${relRoot}/new`}>
        New Request
      </Link>
    </div>
  );
};

export default AllRequestsContainer;
