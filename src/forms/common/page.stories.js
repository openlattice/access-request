import { Form } from 'lattice-fabricate';

import { page10Schema, page10UiSchema } from './schemas/page10Schemas';
import { page11Schema, page11UiSchema } from './schemas/page11Schemas';
import { page12Schema, page12UiSchema } from './schemas/page12Schemas';
import { page13Schema, page13UiSchema } from './schemas/page13Schemas';
import { page14Schema, page14UiSchema } from './schemas/page14Schemas';
import { page15Schema, page15UiSchema } from './schemas/page15Schemas';
import { page16Schema, page16UiSchema } from './schemas/page16Schemas';
import { page17Schema, page17UiSchema } from './schemas/page17Schemas';
import { page18Schema, page18UiSchema } from './schemas/page18Schemas';
import { page19Schema, page19UiSchema } from './schemas/page19Schemas';
import { page1Schema, page1UiSchema } from './schemas/page1Schemas';
import { page20Schema, page20UiSchema } from './schemas/page20Schemas';
import { page21Schema, page21UiSchema } from './schemas/page21Schemas';
import { page22Schema, page22UiSchema } from './schemas/page22Schemas';
import { page2Schema, page2UiSchema } from './schemas/page2Schemas';
import { page3Schema, page3UiSchema } from './schemas/page3Schemas';
import { page4Schema, page4UiSchema } from './schemas/page4Schemas';
import { page5Schema, page5UiSchema } from './schemas/page5Schemas';
import { page6Schema, page6UiSchema } from './schemas/page6Schemas';
import { page7Schema, page7UiSchema } from './schemas/page7Schemas';
import { page8Schema, page8UiSchema } from './schemas/page8Schemas';
import { page9Schema, page9UiSchema } from './schemas/page9Schemas';

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

export const Page9 = Template.bind({});
Page9.args = {
  schema: page9Schema,
  uiSchema: page9UiSchema,
};

export const Page10 = Template.bind({});
Page10.args = {
  schema: page10Schema,
  uiSchema: page10UiSchema,
};

export const Page11 = Template.bind({});
Page11.args = {
  schema: page11Schema,
  uiSchema: page11UiSchema,
};

export const Page12 = Template.bind({});
Page12.args = {
  schema: page12Schema,
  uiSchema: page12UiSchema,
};

export const Page13 = Template.bind({});
Page13.args = {
  schema: page13Schema,
  uiSchema: page13UiSchema,
};

export const Page14 = Template.bind({});
Page14.args = {
  schema: page14Schema,
  uiSchema: page14UiSchema,
};

export const Page15 = Template.bind({});
Page15.args = {
  schema: page15Schema,
  uiSchema: page15UiSchema,
};

export const Page16 = Template.bind({});
Page16.args = {
  schema: page16Schema,
  uiSchema: page16UiSchema,
};

export const Page17 = Template.bind({});
Page17.args = {
  schema: page17Schema,
  uiSchema: page17UiSchema,
};

export const Page18 = Template.bind({});
Page18.args = {
  schema: page18Schema,
  uiSchema: page18UiSchema,
};

export const Page19 = Template.bind({});
Page19.args = {
  schema: page19Schema,
  uiSchema: page19UiSchema,
};

export const Page20 = Template.bind({});
Page20.args = {
  schema: page20Schema,
  uiSchema: page20UiSchema,
};

export const Page21 = Template.bind({});
Page21.args = {
  schema: page21Schema,
  uiSchema: page21UiSchema,
};

export const Page22 = Template.bind({});
Page22.args = {
  schema: page22Schema,
  uiSchema: page22UiSchema,
};
