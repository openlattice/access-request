// @flow

import { Map } from 'immutable';
import { Form } from 'lattice-fabricate';
import { DataUtils } from 'lattice-utils';
import type { UUID } from 'lattice';

import { updateAccessRequest } from './actions';

import { PropertyTypes } from '../../../core/edm/constants';
import { useDispatch } from '../../../core/redux';

const { getPropertyValue } = DataUtils;

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
  const formDataStr = getPropertyValue(data, [FORM_DATA, 0]);
  const schemaStr = getPropertyValue(data, [RJSF_JSON_SCHEMA, 0]);
  const uiSchemaStr = getPropertyValue(data, [RJSF_UI_SCHEMA, 0]);

  // TODO: Use React ErrorBoundary for form-specific errors
  // https://reactjs.org/docs/error-boundaries.html
  try {
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
  }
  catch (error) {
    return (<div>An error has occured. Please contact support.</div>);
  }

};

export default AccessRequestEditor;
