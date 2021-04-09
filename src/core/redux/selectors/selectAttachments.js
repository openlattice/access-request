// @flow
import { List, Map } from 'immutable';

import { ATTACHMENTS } from '../../../containers/access/src/reducers/constants';
import { ACCESS } from '../constants';

export default function selectAccessHits() {
  return (state :Map) :List => state.getIn([ACCESS, ATTACHMENTS], List());
}
