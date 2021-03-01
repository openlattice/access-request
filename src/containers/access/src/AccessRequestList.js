// @flow
import { useEffect } from 'react';

// $FlowFixMe
import { List } from 'lattice-ui-kit';
import { DataUtils } from 'lattice-utils';

import AccessRequestListItem from './AccessRequestListItem';
import { getAllAccessRequests } from './actions';

import getRelativeRoot from '../../../utils/getRelativeRoot';
import { useDispatch, useSelector } from '../../../core/redux';
import { selectAccessHits } from '../../../core/redux/selectors';
import { APP_PATHS } from '../../app';

const { getEntityKeyId } = DataUtils;

const AccessRequestList = () => {
  const dispatch = useDispatch();
  const hits = useSelector(selectAccessHits());
  const root = useSelector((store) => store.getIn(APP_PATHS.ROOT));
  const match = useSelector((store) => store.getIn(APP_PATHS.MATCH));
  const relRoot = getRelativeRoot(root, match);

  useEffect(() => {
    dispatch(getAllAccessRequests());
  }, [dispatch]);

  return (
    <List>
      {
        hits.map((accessRequest) => {
          const id = getEntityKeyId(accessRequest) || '';
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
