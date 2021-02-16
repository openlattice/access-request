// @flow
import { Form } from 'lattice-fabricate';

import { schema, uiSchema } from './schemas';

import { submitAccessRequest } from '../../containers/access/src/actions';
import { useDispatch } from '../../core/redux';

const CommonApplicationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    dispatch(submitAccessRequest(payload));
  };

  return (
    <Form schema={schema} uiSchema={uiSchema} onSubmit={handleSubmit} />
  );
};

export default CommonApplicationForm;
