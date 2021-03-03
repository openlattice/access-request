// @flow
import { forwardRef } from 'react';
import type { ElementRef } from 'react';

import { Map } from 'immutable';
import { Form } from 'lattice-fabricate';
import { DataUtils } from 'lattice-utils';
import type { UUID } from 'lattice';

import { updateAccessRequest } from './actions';

import generateReviewSchema from '../../../utils/generateReviewSchema';
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

type AccessRequestEditorProps = {
  ...Props,
  fRef :ElementRef<typeof Form>;
}

const AccessRequestEditor = ({
  accessId,
  data,
  isSubmitting,
  fRef,
} :AccessRequestEditorProps) => {
  const dispatch = useDispatch();
  const formDataStr = getPropertyValue(data, [FORM_DATA, 0]);
  const schemaStr = getPropertyValue(data, [RJSF_JSON_SCHEMA, 0]);
  const uiSchemaStr = getPropertyValue(data, [RJSF_UI_SCHEMA, 0]);

  // TODO: Use React ErrorBoundary for form-specific errors
  // https://reactjs.org/docs/error-boundaries.html
  try {
    const formData = JSON.parse(formDataStr);
    let schema = JSON.parse(schemaStr);
    let uiSchema = JSON.parse(uiSchemaStr);

    if (Array.isArray(schema) && Array.isArray(uiSchema)) {
      const reviewSchemas = generateReviewSchema(schema, uiSchema);
      schema = reviewSchemas.schema;
      uiSchema = reviewSchemas.uiSchema;
    }

    const handleSubmit = (payload) => {
      const { formData: editedFormData } = payload;
      dispatch(updateAccessRequest({
        formData: editedFormData,
        entityKeyId: accessId
      }));
    };

    return (
      <Form
          ref={fRef}
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

/* eslint-disable react/jsx-props-no-spreading */
export default forwardRef<Props, typeof Form>((props, ref) => (
  <AccessRequestEditor {...props} fRef={ref} />
));
