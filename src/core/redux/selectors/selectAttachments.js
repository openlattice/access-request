// @flow
import { Map } from 'immutable';

import { ATTACHMENTS } from '../../../containers/access/src/reducers/constants';
import { ACCESS } from '../constants';

export default function selectAttachments() {
  return (state :Map) :Map => state.getIn([ACCESS, ATTACHMENTS], Map());
}
