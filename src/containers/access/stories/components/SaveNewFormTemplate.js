// @flow
import { forwardRef } from 'react';
import type { ElementRef } from 'react';

import { Form } from 'lattice-fabricate';

import generateReviewSchema from '../../../../utils/generateReviewSchema';
import { EdgelessForm } from '../../../../components/styled';
import { useDispatch } from '../../../../core/redux';
import { saveNewFormTemplate } from '../../src/actions';

type Props = {
  isSubmitting :boolean;
  schema :Object;
  type :string;
  uiSchema :Object;
};

type SaveNewFormTemplateProps = {
  ...Props,
  fRef :ElementRef<typeof Form>;
}

const SaveNewFormTemplate = ({
  fRef,
  isSubmitting,
  schema,
  type,
  uiSchema,
} :SaveNewFormTemplateProps) => {
  const dispatch = useDispatch();

  try {

    const reviewSchemas = generateReviewSchema(schema, uiSchema);

    const handleSubmit = () => {
      dispatch(saveNewFormTemplate({
        schema,
        type,
        uiSchema,
      }));
    };

    return (
      <EdgelessForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          ref={fRef}
          schema={reviewSchemas.schema}
          uiSchema={reviewSchemas.uiSchema} />
    );
  }
  catch (error) {
    return (<div>An error has occured. Please contact support.</div>);
  }

};

/* eslint-disable react/jsx-props-no-spreading */
export default forwardRef<Props, typeof Form>((props, ref) => (
  <SaveNewFormTemplate {...props} fRef={ref} />
));
/* eslint-enable */
