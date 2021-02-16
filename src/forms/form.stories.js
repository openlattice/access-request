import { Form } from 'lattice-fabricate';

import { schema, uiSchema } from './common/schemas';

export default {
  title: 'Forms/Common Application',
  component: Form,
  argTypes: {
    schema: { control: 'object' },
    uiSchema: { control: 'object' },
  }
};

const Template = (args) => <Form {...args} />;

export const CommonApplication = Template.bind({});
CommonApplication.args = {
  schema,
  uiSchema,
};
