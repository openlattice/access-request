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

import { PropertyTypes } from '../../../core/edm/constants';
import { getPropertyValue } from '../../../utils/EntityUtils';

const { REQUEST_DATE_TIME, TYPE } = PropertyTypes;

type Props = {
  data :Map;
};

const AccessRequestListItem = ({ data } :Props) => {
  const type = getPropertyValue(data, TYPE);
  const requestDateTime = getPropertyValue(data, REQUEST_DATE_TIME);
  const formattedDT = DateTime.fromISO(requestDateTime).toLocaleString(DateTime.DATE_SHORT);

  const initials = type.split(' ').map((word) => word.charAt(0).toUpperCase()).join('');

  return (
    <ListItem button component={Link}>
      <ListItemAvatar>
        <Avatar>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={type} secondary={formattedDT} />
    </ListItem>
  );
};

export default AccessRequestListItem;
