// @flow
import { List, Map } from 'immutable';

import { ACCESS } from '../constants';

export default function selectAccessRequestData() {
  return (state :Map) :List => state.getIn([ACCESS, 'accessRequest'], List());
}
