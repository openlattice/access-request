// @flow
import { useEffect } from 'react';

import { List } from 'lattice-ui-kit';
import { DataUtils } from 'lattice-utils';

import AccessRequestListItem from './AccessRequestListItem';
import { getAllAccessRequests } from './actions';

import { useDispatch, useSelector } from '../../../core/redux';
import { selectAccessHits } from '../../../core/redux/selectors';
import { getRelativeRoot } from '../../../utils/RouteUtils';

const { getEntityKeyId } = DataUtils;

const AccessRequestList = () => {
  const dispatch = useDispatch();
  const hits = useSelector(selectAccessHits());
  const root = useSelector((store) => store.getIn(['app', 'root']));
  const match = useSelector((store) => store.getIn(['app', 'match']));
  const relRoot = getRelativeRoot(root, match);

  useEffect(() => {
    dispatch(getAllAccessRequests());
  }, [dispatch]);

  return (
    <List>
      {
        hits.map((accessRequest) => {
          const id = getEntityKeyId(accessRequest);
          return (
            <AccessRequestListItem
                data={accessRequest}
                to={`${relRoot}/request/${id}`}
                key={id} />
          );
        })
      }
    </List>
  );
};

export default AccessRequestList;
