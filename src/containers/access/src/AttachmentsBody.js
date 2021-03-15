// @flow
import { useState } from 'react';

import { Tab, Tabs } from 'lattice-ui-kit';

import UploadAttachmentsContainer from './UploadAttachmentsContainer';

import TabPanel from '../../../components/TabPanel';
import { ModalBody } from '../../../components/styled';

const AttachmentsBody = () => {
  const [value, setValue] = useState(0);

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
        <UploadAttachmentsContainer />
      </TabPanel>
    </ModalBody>
  );
};

export default AttachmentsBody;
