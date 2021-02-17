// @flow
import { Map } from 'immutable';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'lattice-ui-kit';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { selectAccessRequest } from './actions';

import { PropertyTypes } from '../../../core/edm/constants';
import { useDispatch } from '../../../core/redux';
import { getPropertyValue } from '../../../utils/EntityUtils';

const { REQUEST_DATE_TIME, TYPE } = PropertyTypes;

type Props = {
  data :Map;
  to :string;
};

const AccessRequestListItem = ({ data, to } :Props) => {
  const dispatch = useDispatch();
  const type = getPropertyValue(data, TYPE);
  const requestDateTime = getPropertyValue(data, REQUEST_DATE_TIME);
  const formattedDT = DateTime.fromISO(requestDateTime).toLocaleString(DateTime.DATE_SHORT);

  const handleClick = () => {
    dispatch(selectAccessRequest(data));
  };

  const initials = type
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return (
    <ListItem
        button
        component={Link}
        onClick={handleClick}
        to={to}>
      <ListItemAvatar>
        <Avatar>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={type} secondary={formattedDT} />
    </ListItem>
  );
};

export default AccessRequestListItem;