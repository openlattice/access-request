/*
 * @flow
 */

import { Models } from 'lattice';

const { FQN } = Models;

const PROPERTY_TYPE_FQNS = {
  DATE_TIME: FQN.of('ol.datetime'),
  DESCRIPTION: FQN.of('ol.description'),
  FILE_DATA: FQN.of('ol.filedata'),
  FORM_DATA: FQN.of('ol.formdata'),
  GROUP_ID: FQN.of('ol.groupid'),
  ID: FQN.of('ol.id'),
  LABEL: FQN.of('ol.label'),
  NAME: FQN.of('ol.name'),
  REQUEST_DATE_TIME: FQN.of('ol.requestdatetime'),
  RJSF_JSON_SCHEMA: FQN.of('ol.rjsfjsonschema'),
  RJSF_UI_SCHEMA: FQN.of('ol.rjsfuischema'),
  TYPE: FQN.of('ol.type'),
};

export default PROPERTY_TYPE_FQNS;
