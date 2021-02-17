// @flow
import { Map } from 'immutable';
import { Form } from 'lattice-fabricate';

import { PropertyTypes } from '../../../core/edm/constants';
import { getPropertyValues } from '../../../utils/EntityUtils';

const {
  FORM_DATA,
  RJSF_JSON_SCHEMA,
  RJSF_UI_SCHEMA
} = PropertyTypes;

type Props = {
  data :Map;
};

const AccessRequestEditor = ({ data } :Props) => {

  const [formDataStr, schemaStr, uiSchemaStr] = getPropertyValues(data, [FORM_DATA, RJSF_JSON_SCHEMA, RJSF_UI_SCHEMA]);

  const formData = JSON.parse(formDataStr);
  const schema = JSON.parse(schemaStr);
  const uiSchema = JSON.parse(uiSchemaStr);
  return (
    <Form formData={formData} schema={schema} uiSchema={uiSchema} />
  );
};

export default AccessRequestEditor;
