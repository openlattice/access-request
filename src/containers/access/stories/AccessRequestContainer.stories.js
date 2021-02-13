import AccessRequestContainer from '../src/AccessRequestContainer';

export default {
  title: 'Access Request/AccessRequestContainer',
  component: AccessRequestContainer
};

const Template = (args) => <AccessRequestContainer {...args}>test</AccessRequestContainer>;

export const test = Template.bind({});
