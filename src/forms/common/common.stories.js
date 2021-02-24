import CommonApplicationForm from './CommonApplicationForm';

import ModuleProvider from '../../core/provider/ModuleProvider';

export default {
  title: 'Common Application',
  component: CommonApplicationForm,
};

/* eslint-disable react/jsx-props-no-spreading */
const Template = (args) => (
  <ModuleProvider>
    <CommonApplicationForm {...args} />
  </ModuleProvider>
);

export const CommonApplication = Template.bind({});
