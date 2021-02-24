import { Form } from 'lattice-fabricate';

import { page1Schema, page1UiSchema } from './schemas/page1schemas';

export default {
  title: 'Common Application/Page 1',
  component: Form,
  argTypes: {
    schema: { control: 'object' },
    uiSchema: { control: 'object' },
  }
};

/* eslint-disable-next-line react/jsx-props-no-spreading */
const Template = (args) => <Form {...args} />;

export const Page1 = Template.bind({});
Page1.args = {
  schema: page1Schema,
  uiSchema: page1UiSchema,
};
