/* eslint-disable max-len */
export const page18Schema = {
  type: 'object',
  title: 'Cloud Storage',
  properties: {
    cloudStorage: {
      type: 'boolean',
      title: 'Will any of the data be stored on a cloud server?',
      description: 'If Yes, please specify and provide assurance in the data security letter (item #25) that all data security requirements will be met.',
      enumNames: ['Yes', 'No'],
    },
  },
};

export const page18UiSchema = {
  cloudStorage: {
    classNames: 'column-span-12',
    'ui:widget': 'radio',
  },
};
