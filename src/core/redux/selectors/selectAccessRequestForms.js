// @flow
import { List, Map } from 'immutable';

import { FORMS } from '../../../containers/access/src/reducers/constants';
import { ACCESS } from '../constants';

export default function selectAccessRequestForms() {
  return (state :Map) :List => state.getIn([ACCESS, FORMS], List());
}
