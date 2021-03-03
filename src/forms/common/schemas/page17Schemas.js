/* eslint-disable max-len */
export const page17Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    thirdPartyManagement: {
      type: 'object',
      title: 'Third-Party Mangement',
      properties: {
        thirdPartyManagement: {
          type: 'boolean',
          title: 'Will a third-party business/contractor be managing any of the data?',
          description: 'If Yes, please specify and provide assurance in the data security letter (item #25) that all data security requirements will be met.',
          enumNames: ['Yes', 'No'],
        },
      },
    },
  },
};

export const page17UiSchema = {
  thirdPartyManagement: {
    classNames: 'column-span-12 grid-container',
    thirdPartyManagement: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
  },
};
