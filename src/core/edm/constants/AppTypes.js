/*
 * @flow
 */

import { Models } from 'lattice';

const { FQN } = Models;

const APP_TYPE_FQNS = {
  ACCESS_REQUEST_SUBMISSION: FQN.of('app.accessrequestsubmission'),
  ATTACHED_TO: FQN.of('app.attachedto'),
  FILE: FQN.of('app.file'),
  FORM: FQN.of('app.form'),
};

export default APP_TYPE_FQNS;
