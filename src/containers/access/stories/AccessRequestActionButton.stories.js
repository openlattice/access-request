import AccessRequestActionButton from '../src/AccessRequestActionButton';
import ModuleProvider from '../../../core/provider/ModuleProvider';

export default {
  title: 'Access Request Action Button',
  component: AccessRequestActionButton,
};

/* eslint-disable react/jsx-props-no-spreading */
const Template = (args) => (
  <ModuleProvider>
    <AccessRequestActionButton {...args} />
  </ModuleProvider>
);

/* eslint-disable max-len */
export const AccessRequestAction = Template.bind({});
