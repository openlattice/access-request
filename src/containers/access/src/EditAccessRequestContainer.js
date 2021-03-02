// @flow
import { useRef } from 'react';

import { Button } from 'lattice-ui-kit';
import { DataUtils, ReduxUtils } from 'lattice-utils';
import { useReactToPrint } from 'react-to-print';

import AccessRequestEditor from './AccessRequestEditor';
import { UPDATE_ACCESS_REQUEST } from './actions';

import { useSelector } from '../../../core/redux';
import { ACCESS, REQUEST_STATE } from '../../../core/redux/constants';
import { selectAccessRequestData } from '../../../core/redux/selectors';

const { getEntityKeyId } = DataUtils;
const { isPending } = ReduxUtils;

const EditAccessRequestContainer = () => {
  const data = useSelector(selectAccessRequestData());
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const requestState = useSelector((s) => s.getIn([ACCESS, UPDATE_ACCESS_REQUEST, REQUEST_STATE]));

  const accessId = getEntityKeyId(data) || '';
  const isSubmitting = isPending(requestState);

  return (
    <>
      <Button onClick={handlePrint}>Print</Button>
      <AccessRequestEditor
          accessId={accessId}
          data={data}
          isSubmitting={isSubmitting}
          ref={componentRef} />
    </>
  );
};

export default EditAccessRequestContainer;
