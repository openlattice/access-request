// @flow
import { Map } from 'immutable';
import { Constants } from 'lattice';
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

const { OPENLATTICE_LAST_WRITE_FQN } = Constants;
const { REQUEST_DATE_TIME, TYPE } = PropertyTypes;

type Props = {
  data :Map;
  to :string;
};

const AccessRequestListItem = ({ data, to } :Props) => {
  const dispatch = useDispatch();
  const type = getPropertyValue(data, TYPE);
  const requestDateTime = getPropertyValue(data, REQUEST_DATE_TIME);
  const lastWrite = getPropertyValue(data, OPENLATTICE_LAST_WRITE_FQN);
  const requestDT = DateTime.fromISO(requestDateTime);
  const updateDT = DateTime.fromISO(lastWrite);

  const formattedDT = requestDT.toLocaleString(DateTime.DATE_SHORT);
  let secondaryText = `Created: ${formattedDT}`;

  const diff = updateDT.diff(requestDT, 'seconds');
  const { seconds } = diff.toObject();
  if (seconds > 1) {
    const relativeUpdateTime = updateDT.toRelative({ style: 'short' });
    secondaryText = secondaryText.concat(` · Updated: ${relativeUpdateTime}`);
  }

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
        disableGutters
        onClick={handleClick}
        to={to}>
      <ListItemAvatar>
        <Avatar>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={type} secondary={secondaryText} />
    </ListItem>
  );
};

export default AccessRequestListItem;
