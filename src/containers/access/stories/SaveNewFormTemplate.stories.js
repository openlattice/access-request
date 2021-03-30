import SaveNewFormTemplate from './components/SaveNewFormTemplate';

import ModuleProvider from '../../../core/provider/ModuleProvider';
import { schemas, uiSchemas } from '../../../forms/common/schemas';

export default {
  title: 'Access Request/Save New Form Template',
  component: SaveNewFormTemplate
};

/* eslint-disable react/jsx-props-no-spreading */
const Template = (args) => (
  <ModuleProvider>
    <SaveNewFormTemplate {...args} />
  </ModuleProvider>
);
/* eslint-enable */

export const SaveNewTemplate = Template.bind({});
SaveNewTemplate.args = {
  schema: schemas,
  type: 'Common Application',
  uiSchema: uiSchemas,
};
