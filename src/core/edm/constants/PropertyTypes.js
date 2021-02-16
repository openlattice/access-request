/*
 * @flow
 */

import { Models } from 'lattice';

const { FQN } = Models;

const PROPERTY_TYPE_FQNS = {
  ID: FQN.of('ol.id'),
  RJSF_JSON_SCHEMA: FQN.of('ol.rjsfjsonschema'),
  RJSF_UI_SCHEMA: FQN.of('ol.rjsfuischema'),
  FORM_DATA: FQN.of('ol.formdata'),
  REQUEST_DATE_TIME: FQN.of('ol.requestdatetime'),
  TYPE: FQN.of('ol.type'),
};

export default PROPERTY_TYPE_FQNS;
