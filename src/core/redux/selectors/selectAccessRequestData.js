// @flow
import { List, Map } from 'immutable';

import { ACCESS_REQUEST } from '../../../containers/access/src/reducers/constants';
import { ACCESS } from '../constants';

export default function selectAccessRequestData() {
  return (state :Map) :List => state.getIn([ACCESS, ACCESS_REQUEST], List());
}
