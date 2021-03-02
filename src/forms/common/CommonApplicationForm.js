// @flow
import { useEffect } from 'react';

import styled from 'styled-components';
import { Form, Paged } from 'lattice-fabricate';
import { Button } from 'lattice-ui-kit';
import { ReduxUtils } from 'lattice-utils';

import { schemas, uiSchemas } from './schemas';

import { SUBMIT_ACCESS_REQUEST, submitAccessRequest } from '../../containers/access/src/actions';
import { useDispatch, useSelector } from '../../core/redux';
import { resetRequestState } from '../../core/redux/actions';
import { ACCESS, REQUEST_STATE } from '../../core/redux/constants';
import { goToRoot } from '../../core/router/actions';

const { isPending, isSuccess } = ReduxUtils;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 30px 30px;
`;

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

          const handleSubmit = () => {
            const payload = {
              formData: pagedData,
              schema: schemas,
              uiSchema: uiSchemas,
              type: 'Common Application'
            };
            dispatch(submitAccessRequest(payload));
          };

          const handleNext = isLastPage
            ? handleSubmit
            : validateAndSubmit;

          return (
            <>
              <Form
                  ref={formRef}
                  hideSubmit
                  isSubmitting={pending}
                  formData={pagedData}
                  onSubmit={onNext}
                  schema={schemas[page]}
                  uiSchema={uiSchemas[page]} />
              <ActionRow>
                <Button
                    disabled={!(page > 0)}
                    onClick={onBack}>
                  Back
                </Button>
                <span>{`${page + 1} of ${totalPages}`}</span>
                <Button
                    isLoading={pending}
                    mode="primary"
                    onClick={handleNext}>
                  { isLastPage ? 'Complete Survey' : 'Next' }
                </Button>
              </ActionRow>
            </>
          );
        }} />
  );
};

export default CommonApplicationForm;
