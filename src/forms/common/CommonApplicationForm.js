// @flow
import { Form } from 'lattice-fabricate';
import { ReduxUtils } from 'lattice-utils';

import { schema, uiSchema } from './schemas';

import { SUBMIT_ACCESS_REQUEST, submitAccessRequest } from '../../containers/access/src/actions';
import { useDispatch, useSelector } from '../../core/redux';
import { ACCESS, REQUEST_STATE } from '../../core/redux/constants';

const { isPending } = ReduxUtils;

const CommonApplicationForm = () => {
  const dispatch = useDispatch();
  const requestState = useSelector((s) => s.getIn([ACCESS, SUBMIT_ACCESS_REQUEST, REQUEST_STATE]));

  const isSubmitting = isPending(requestState);

  const handleSubmit = (payload) => {
    dispatch(submitAccessRequest(payload));
  };

  return (
    <Form
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        schema={schema}
        uiSchema={uiSchema} />
  );
};

export default CommonApplicationForm;
