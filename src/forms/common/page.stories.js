import { Form } from 'lattice-fabricate';

import { page1Schema, page1UiSchema } from './schemas/page1Schemas';
import { page2Schema, page2UiSchema } from './schemas/page2Schemas';
import { page3Schema, page3UiSchema } from './schemas/page3Schemas';
import { page4Schema, page4UiSchema } from './schemas/page4Schemas';

export default {
  title: 'Pages',
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

export const Page2 = Template.bind({});
Page2.args = {
  schema: page2Schema,
  uiSchema: page2UiSchema,
};

export const Page3 = Template.bind({});
Page3.args = {
  schema: page3Schema,
  uiSchema: page3UiSchema,
};

export const Page4 = Template.bind({});
Page4.args = {
  schema: page4Schema,
  uiSchema: page4UiSchema,
};
