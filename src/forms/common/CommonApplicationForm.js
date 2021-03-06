// @flow
import { useEffect } from 'react';

import styled from 'styled-components';
import { Paged } from 'lattice-fabricate';
import { Button } from 'lattice-ui-kit';
import { DataUtils, ReduxUtils, ValidationUtils } from 'lattice-utils';

import transformAttachments from '../../utils/transformAttachments';
import { EdgelessForm } from '../../components/styled';
import {
  SUBMIT_ACCESS_REQUEST,
  clearAccessRequest,
  deleteFieldAttachment,
  submitAccessRequest,
  updateAccessRequest,
  uploadFieldAttachment
} from '../../containers/access/src/actions';
import { PropertyTypes } from '../../core/edm/constants';
import { useDispatch, useSelector } from '../../core/redux';
import { resetRequestState } from '../../core/redux/actions';
import { ACCESS, REQUEST_STATE } from '../../core/redux/constants';
import { selectAccessRequestData, selectAttachments } from '../../core/redux/selectors';
import { goToRoot } from '../../core/router/actions';

const { isPending } = ReduxUtils;
const { getEntityKeyId, getPropertyValue } = DataUtils;
const { isValidUUID } = ValidationUtils;

const { FORM_DATA } = PropertyTypes;

const ActionRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
`;

type Props = {
  schemas :Object[];
  uiSchemas :Object[];
}

const CommonApplicationForm = ({ schemas, uiSchemas } :Props) => {
  const dispatch = useDispatch();
  const accessRequest = useSelector(selectAccessRequestData());
  const attachments = useSelector(selectAttachments());
  const requestState = useSelector((s) => s.getIn([ACCESS, SUBMIT_ACCESS_REQUEST, REQUEST_STATE]));

  useEffect(() => () => {
    dispatch(resetRequestState([SUBMIT_ACCESS_REQUEST]));
    dispatch(clearAccessRequest());
  }, [dispatch]);

  const pending = isPending(requestState);
  const accessRequestId = getEntityKeyId(accessRequest) || '';
  const initialFormDataStr = getPropertyValue(accessRequest, [FORM_DATA, 0]) || '{}';
  const attachmentsByGroupId = transformAttachments(attachments);

  let parsedFormData;
  try {
    parsedFormData = JSON.parse(initialFormDataStr);
  }
  catch (error) {
    return (<div>An error has occured. Please contact support.</div>);
  }

  const onPageChange = (pageNumber, formData) => {
    if (isValidUUID(accessRequestId)) {
      dispatch(updateAccessRequest({
        formData,
        entityKeyId: accessRequestId
      }));
    }
    else {
      const payload = {
        formData,
        schema: schemas,
        uiSchema: uiSchemas,
        type: 'Common Application',
      };
      dispatch(submitAccessRequest(payload));
    }
  };

  const onDrop = (file, groupId, newFormData) => {
    dispatch(uploadFieldAttachment({
      accessRequestId,
      file,
      formData: newFormData,
      groupId,
    }));
  };

  const onDeleteAttachment = (attachment, currentFormData) => {
    dispatch(deleteFieldAttachment({
      accessRequestId,
      attachment,
      formData: currentFormData,
    }));
  };

  return (
    <Paged
        onPageChange={onPageChange}
        render={(props) => {
          const {
            formRef,
            onBack,
            onNext,
            page,
            validateAndSubmit,
          } = props;

          const totalPages = schemas.length;
          const isLastPage = page === totalPages - 1;

          const handleSubmit = () => {
            dispatch(goToRoot());
          };

          const handleNext = isLastPage
            ? handleSubmit
            : validateAndSubmit;

          const formContext = {
            attachments: attachmentsByGroupId,
            formRef,
            onDrop,
            onDeleteAttachment,
          };

          return (
            <>
              <EdgelessForm
                  formData={parsedFormData}
                  formContext={formContext}
                  hideSubmit
                  isSubmitting={pending}
                  onSubmit={onNext}
                  ref={formRef}
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
