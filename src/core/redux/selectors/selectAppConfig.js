// @flow
import { Map } from 'immutable';

import { APP_PATHS } from '../../../containers/app';

export default function selectAppConfig() {
  return (state :Map) :Object => state.getIn(APP_PATHS.APP_CONFIG, {});
}
