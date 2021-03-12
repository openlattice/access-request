// @flow
import { useState } from 'react';

import { Tab, Tabs } from 'lattice-ui-kit';

import Dropzone from '../../../components/Dropzone';
import ModalBody from '../../../components/styled';
import TabPanel from '../../../components/TabPanel';

const AttachmentsBody = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ModalBody>
      <Tabs
          onChange={handleChange}
          value={value}
          indicatorColor="primary"
          textColor="primary">
        <Tab label="Manage" />
        <Tab label="Upload" />
      </Tabs>
      <TabPanel
          value={value}
          index={0}>
        manage
      </TabPanel>
      <TabPanel
          value={value}
          index={1}>
        <Dropzone onDrop={() => {}} />
      </TabPanel>
    </ModalBody>
  );
};

export default AttachmentsBody;
