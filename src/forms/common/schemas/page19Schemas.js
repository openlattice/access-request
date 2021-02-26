/* eslint-disable max-len */
export const page19Schema = {
  type: 'object',
  title: 'Data Destruction',
  properties: {
    dataDestruction: {
      type: 'string',
      title: 'Explain how and when the data will be destroyed.',
    },
  },
};

export const page19UiSchema = {
  dataDestruction: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  },
};
