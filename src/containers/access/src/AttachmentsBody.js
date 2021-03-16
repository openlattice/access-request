// @flow
import { useState } from 'react';

// $FlowFixMe
import { Tab, Tabs } from 'lattice-ui-kit';
import type { UUID } from 'lattice';

import ManageAttachmentsContainer from './ManageAttachmentsContainer';
import UploadAttachmentsContainer from './UploadAttachmentsContainer';

import TabPanel from '../../../components/TabPanel';
import { ModalBody } from '../../../components/styled';

type Props = {
  accessRequestId :UUID;
};

const AttachmentsBody = ({ accessRequestId } :Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSuccess = () => {
    setValue(0);
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
        <ManageAttachmentsContainer accessRequestId={accessRequestId} />
      </TabPanel>
      <TabPanel
          index={1}
          value={value}>
        <UploadAttachmentsContainer accessRequestId={accessRequestId} onSuccess={handleSuccess} />
      </TabPanel>
    </ModalBody>
  );
};

export default AttachmentsBody;
