// @flow

import { Map } from 'immutable';
import { Form } from 'lattice-fabricate';
import type { UUID } from 'lattice';

import { updateAccessRequest } from './actions';

import { PropertyTypes } from '../../../core/edm/constants';
import { useDispatch } from '../../../core/redux';
import { getPropertyValues } from '../../../utils/EntityUtils';

const {
  FORM_DATA,
  RJSF_JSON_SCHEMA,
  RJSF_UI_SCHEMA
} = PropertyTypes;

type Props = {
  accessId :UUID;
  data :Map;
  isSubmitting :boolean;
};

const AccessRequestEditor = ({ accessId, data, isSubmitting } :Props) => {
  const dispatch = useDispatch();
  const [formDataStr, schemaStr, uiSchemaStr] = getPropertyValues(data, [FORM_DATA, RJSF_JSON_SCHEMA, RJSF_UI_SCHEMA]);

  const formData = JSON.parse(formDataStr);
  const schema = JSON.parse(schemaStr);
  const uiSchema = JSON.parse(uiSchemaStr);

  const handleSubmit = (payload) => {
    const { formData: editedFormData } = payload;
    dispatch(updateAccessRequest({
      formData: editedFormData,
      entityKeyId: accessId
    }));
  };

  return (
    <Form
        formData={formData}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        schema={schema}
        uiSchema={uiSchema} />
  );
};

export default AccessRequestEditor;
