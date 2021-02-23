// @flow
import { List } from 'immutable';

import { ACCESS } from '../constants';

export default function selectAccessHits() {
  return (state :Map) :List => state.getIn([ACCESS, 'hits'], List());
}
