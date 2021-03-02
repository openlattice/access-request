// @flow
import { Map } from 'immutable';
import { Constants } from 'lattice';
import {
  // $FlowFixMe
  Avatar,
  // $FlowFixMe
  ListItem,
  // $FlowFixMe
  ListItemAvatar,
  // $FlowFixMe
  ListItemText,
} from 'lattice-ui-kit';
import { DataUtils } from 'lattice-utils';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { selectAccessRequest } from './actions';

import { PropertyTypes } from '../../../core/edm/constants';
import { useDispatch } from '../../../core/redux';

const { OPENLATTICE_LAST_WRITE_FQN } = Constants;
const { REQUEST_DATE_TIME, TYPE } = PropertyTypes;
const { getPropertyValue } = DataUtils;

type Props = {
  data :Map;
  to :string;
};

const AccessRequestListItem = ({ data, to } :Props) => {
  const dispatch = useDispatch();
  const type = getPropertyValue(data, [TYPE, 0]);
  const requestDateTime = getPropertyValue(data, [REQUEST_DATE_TIME, 0]);
  const lastWrite = getPropertyValue(data, [OPENLATTICE_LAST_WRITE_FQN, 0]);
  const requestDT = DateTime.fromISO(requestDateTime);
  const updateDT = DateTime.fromISO(lastWrite);

  const formattedDT = requestDT.toLocaleString(DateTime.DATE_SHORT);
  let secondaryText = `Created: ${formattedDT}`;

  const diff = updateDT.diff(requestDT, 'seconds');
  const { seconds } = diff;
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
