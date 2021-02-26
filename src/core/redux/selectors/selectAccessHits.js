// @flow
import { List, Map } from 'immutable';

import { ACCESS } from '../constants';

export default function selectAccessHits() {
  return (state :Map) :List => state.getIn([ACCESS, 'hits'], List());
}
