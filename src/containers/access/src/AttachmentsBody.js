// @flow
import { useEffect, useState } from 'react';

import { Tab, Tabs } from 'lattice-ui-kit';
import type { UUID } from 'lattice';

import UploadAttachmentsContainer from './UploadAttachmentsContainer';
import { getAttachments } from './actions';

import TabPanel from '../../../components/TabPanel';
import { ModalBody } from '../../../components/styled';
import { useDispatch } from '../../../core/redux';

type Props = {
  accessRequestId :UUID;
};

const AttachmentsBody = ({ accessRequestId } :Props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getAttachments(accessRequestId));
  }, [accessRequestId, dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ModalBody>
      <Tabs
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          value={value}>
        <Tab label="Manage" />
        <Tab label="Upload" />
      </Tabs>
      <TabPanel
          index={0}
          value={value}>
        manage
      </TabPanel>
      <TabPanel
          index={1}
          value={value}>
        <UploadAttachmentsContainer accessRequestId={accessRequestId} />
      </TabPanel>
    </ModalBody>
  );
};

export default AttachmentsBody;
