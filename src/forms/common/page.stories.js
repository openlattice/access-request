import { Form } from 'lattice-fabricate';

import { page1Schema, page1UiSchema } from './schemas/page1Schemas';
import { page2Schema, page2UiSchema } from './schemas/page2Schemas';
import { page3Schema, page3UiSchema } from './schemas/page3Schemas';
import { page4Schema, page4UiSchema } from './schemas/page4Schemas';
import { page5Schema, page5UiSchema } from './schemas/page5Schemas';
import { page6Schema, page6UiSchema } from './schemas/page6Schemas';
import { page7Schema, page7UiSchema } from './schemas/page7Schemas';
import { page8Schema, page8UiSchema } from './schemas/page8Schemas';

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

export const Page5 = Template.bind({});
Page5.args = {
  schema: page5Schema,
  uiSchema: page5UiSchema,
};

export const Page6 = Template.bind({});
Page6.args = {
  schema: page6Schema,
  uiSchema: page6UiSchema,
};

export const Page7 = Template.bind({});
Page7.args = {
  schema: page7Schema,
  uiSchema: page7UiSchema,
};

export const Page8 = Template.bind({});
Page8.args = {
  schema: page8Schema,
  uiSchema: page8UiSchema,
};
