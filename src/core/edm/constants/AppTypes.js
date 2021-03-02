/*
 * @flow
 */

import { Models } from 'lattice';

const { FQN } = Models;

const APP_TYPE_FQNS = {
  FORM: FQN.of('app.form'),
  ACCESS_REQUEST_SUBMISSION: FQN.of('app.accessrequestsubmission'),
};

export default APP_TYPE_FQNS;
