// @flow
import { useEffect } from 'react';

import { List } from 'lattice-ui-kit';
import { DataUtils } from 'lattice-utils';

import AccessRequestListItem from './AccessRequestListItem';
import { getAllAccessRequests } from './actions';

import { useDispatch, useSelector } from '../../../core/redux';
import { selectAccessHits } from '../../../core/redux/selectors';

const { getEntityKeyId } = DataUtils;

const AccessRequestList = () => {
  const dispatch = useDispatch();
  const hits = useSelector(selectAccessHits());

  useEffect(() => {
    dispatch(getAllAccessRequests());
  });

  return (
    <List>
      {
        hits.map((accessRequest) => {
          const id = getEntityKeyId(accessRequest);
          return <AccessRequestListItem data={accessRequest} key={id} />;
        })
      }
    </List>
  );
};

export default AccessRequestList;
