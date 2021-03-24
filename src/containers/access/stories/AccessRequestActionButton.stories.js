import AccessRequestAttachmentButton from '../src/AccessRequestAttachmentButton';
import ModuleProvider from '../../../core/provider/ModuleProvider';

export default {
  title: 'Access Request Attachment Button',
  component: AccessRequestAttachmentButton,
};

/* eslint-disable react/jsx-props-no-spreading */
const Template = (args) => (
  <ModuleProvider>
    <AccessRequestAttachmentButton {...args} />
  </ModuleProvider>
);

/* eslint-disable max-len */
export const AccessRequestAction = Template.bind({});
