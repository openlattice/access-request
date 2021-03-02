// @flow
import { List, Map } from 'immutable';
import { ReduxConstants } from 'lattice-utils';

import { ACCESS } from '../constants';

const { HITS } = ReduxConstants;

export default function selectAccessHits() {
  return (state :Map) :List => state.getIn([ACCESS, HITS], List());
}
