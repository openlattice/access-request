// @flow
import { useEffect } from 'react';

import { Form, Paged } from 'lattice-fabricate';
import { ReduxUtils } from 'lattice-utils';

import { schemas, uiSchemas } from './schemas';

import { SUBMIT_ACCESS_REQUEST, submitAccessRequest } from '../../containers/access/src/actions';
import { useDispatch, useSelector } from '../../core/redux';
import { resetRequestState } from '../../core/redux/actions';
import { ACCESS, REQUEST_STATE } from '../../core/redux/constants';
import { goToRoot } from '../../core/router/actions';

const { isPending, isSuccess } = ReduxUtils;

const CommonApplicationForm = () => {
  const dispatch = useDispatch();
  const requestState = useSelector((s) => s.getIn([ACCESS, SUBMIT_ACCESS_REQUEST, REQUEST_STATE]));

  const success = isSuccess(requestState);
  const pending = isPending(requestState);
  useEffect(() => {
    if (success) {
      dispatch(goToRoot());
    }

    return () => {
      dispatch(resetRequestState([SUBMIT_ACCESS_REQUEST]));
    };
  }, [dispatch, success]);

  const handleSubmit = (payload) => {
    dispatch(submitAccessRequest(payload));
  };

  console.log(schemas[0]);

  return (
    <Paged
        render={(props) => {
          const {
            formRef,
            pagedData,
            page,
            onBack,
            onNext,
            validateAndSubmit,
          } = props;

          const totalPages = schemas.length;
          const isLastPage = page === totalPages - 1;

          const handleNext = isLastPage
            ? handleSubmit
            : validateAndSubmit;

          return (
            <Form
                ref={formRef}
                isSubmitting={pending}
                formData={pagedData}
                onSubmit={handleSubmit}
                schema={schemas[page]}
                uiSchema={uiSchemas[page]} />
          );
        }} />
  );
};

export default CommonApplicationForm;
