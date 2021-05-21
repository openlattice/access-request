// @flow
import { useEffect, useRef } from 'react';

import styled from 'styled-components';
import { faPrint } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Spinner } from 'lattice-ui-kit';
import { ReduxUtils } from 'lattice-utils';
import { useRouteMatch } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import type { Match } from 'react-router';

import AccessRequestAttachmentButton from './AccessRequestAttachmentButton';
import AccessRequestEditor from './AccessRequestEditor';
import {
  GET_ACCESS_REQUEST,
  UPDATE_ACCESS_REQUEST,
  clearAccessRequest,
  clearAttachments,
  getAccessRequest,
  getAttachments,
} from './actions';
import { CenterWrapper } from './styled';

import { useDispatch, useSelector } from '../../../core/redux';
import { resetRequestState } from '../../../core/redux/actions';
import { ACCESS, REQUEST_STATE } from '../../../core/redux/constants';
import { selectAccessRequestData, selectAttachments } from '../../../core/redux/selectors';

const { isPending, isStandby } = ReduxUtils;

const Row = styled.div`
  display: flex;
`;

const PrintButton = styled(IconButton)`
  margin-left: auto;
`;

const EditAccessRequestContainer = () => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const data = useSelector(selectAccessRequestData());
  const attachments = useSelector(selectAttachments());
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const updateState = useSelector((s) => s.getIn([ACCESS, UPDATE_ACCESS_REQUEST, REQUEST_STATE]));
  const fetchState = useSelector((s) => s.getIn([ACCESS, GET_ACCESS_REQUEST, REQUEST_STATE]));

  const match :Match = useRouteMatch();
  const accessRequestId = match.params.accessRequestId || '';

  useEffect(() => {
    dispatch(getAccessRequest(accessRequestId));
    dispatch(getAttachments(accessRequestId));
    return () => {
      dispatch(resetRequestState([UPDATE_ACCESS_REQUEST]));
      dispatch(resetRequestState([GET_ACCESS_REQUEST]));
      dispatch(clearAccessRequest());
      dispatch(clearAttachments());
    };
  }, [accessRequestId, dispatch]);

  const isSubmitting = isPending(updateState);

  return (
    <div>
      <Row>
        <PrintButton onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} fixedWidth />
        </PrintButton>
        <AccessRequestAttachmentButton accessRequestId={accessRequestId} />
      </Row>
      {
        isPending(fetchState) || isStandby(fetchState)
          ? (
            <CenterWrapper>
              <Spinner size="2x" />
            </CenterWrapper>
          )
          : (
            <AccessRequestEditor
                accessRequestId={accessRequestId}
                attachments={attachments}
                data={data}
                isSubmitting={isSubmitting}
                ref={componentRef} />
          )
      }
    </div>
  );
};

export default EditAccessRequestContainer;
