// @flow
import type { Node } from 'react';

// $FlowFixMe
import { Box } from 'lattice-ui-kit';

type Props = {|
  children :Node;
  index :number;
  value :number;
|};

/* eslint-disable react/jsx-props-no-spreading */
const TabPanel = ({
  children,
  value,
  index,
  ...other
} :Props) => (
  <div
      aria-controls={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      role="tabpanel"
      {...other}>
    {value === index && (
      <Box paddingTop={3} paddingBottom={3}>
        {children}
      </Box>
    )}
  </div>
);

export default TabPanel;
