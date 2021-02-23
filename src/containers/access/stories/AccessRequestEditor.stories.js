import { fromJS } from 'immutable';

import AccessRequestEditor from '../src/AccessRequestEditor';
import ModuleProvider from '../../../core/provider/ModuleProvider';
import { PropertyTypes } from '../../../core/edm/constants';

const {
  TYPE,
  REQUEST_DATE_TIME,
  RJSF_JSON_SCHEMA,
  RJSF_UI_SCHEMA,
  FORM_DATA
} = PropertyTypes;

export default {
  title: 'Access Request/AccessRequestEditor',
  component: AccessRequestEditor
};

/* eslint-disable react/jsx-props-no-spreading */
const Template = (args) => (
  <ModuleProvider>
    <AccessRequestEditor {...args} />
  </ModuleProvider>
);

export const Editor = Template.bind({});
Editor.args = {
  data: fromJS({
    [TYPE]: ['Common Application'],
    [RJSF_JSON_SCHEMA]: ['{"type":"object","title":"Common Application","properties":{"personSection":{"type":"object","title":"Personal Information","properties":{"firstName":{"type":"string","title":"First name"},"middleName":{"type":"string","title":"Middle name"},"lastName":{"type":"string","title":"Last name"},"dob":{"type":"string","format":"date","title":"Date of Birth"},"phone":{"type":"string","title":"Phone #"}},"required":["firstName","lastName","dob"]}}}'],
    [RJSF_UI_SCHEMA]: ['{"personSection":{"classNames":"column-span-12 grid-container","firstName":{"classNames":"column-span-4"},"middleName":{"classNames":"column-span-4"},"lastName":{"classNames":"column-span-4"},"dob":{"classNames":"column-span-4","ui:widget":"DateWidget"},"sex":{"classNames":"column-span-4"},"phone":{"classNames":"column-span-4"},"ssn":{"classNames":"column-span-4"}}}'],
    [FORM_DATA]: ['{"personSection": {"firstName": "test"}}'],
    [REQUEST_DATE_TIME]: [''],
  })
};
