import { fromJS } from 'immutable';

import AccessRequestEditor from '../src/AccessRequestEditor';
import ModuleProvider from '../../../core/provider/ModuleProvider';
import { PropertyTypes } from '../../../core/edm/constants';
import { schemas, uiSchemas } from '../../../forms/common/schemas';

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

/* eslint-disable max-len */
export const Editor = Template.bind({});
Editor.args = {
  data: fromJS({
    [TYPE]: ['Common Application'],
    [RJSF_JSON_SCHEMA]: [JSON.stringify(schemas)],
    [RJSF_UI_SCHEMA]: [JSON.stringify(uiSchemas)],
    [FORM_DATA]: ['{}'],
    [REQUEST_DATE_TIME]: [''],
  })
};
