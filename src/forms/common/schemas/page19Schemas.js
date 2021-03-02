/* eslint-disable max-len */
export const page19Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    dataDestruction: {
      type: 'object',
      title: 'Data Destruction',
      properties: {
        description: {
          type: 'string',
          title: 'Explain how and when the data will be destroyed.',
        },
      },
    },
  },
};

export const page19UiSchema = {
  dataDestruction: {
    classNames: 'column-span-12 grid-container',
    description: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
  },
};
