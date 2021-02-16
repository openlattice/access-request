import { Form } from 'lattice-fabricate';

import { schema, uiSchema } from './schemas';

const CommonApplicationForm = () => {
  return (
    <Form schema={schema} uiSchema={uiSchema} />
  );
};

export default CommonApplicationForm;
