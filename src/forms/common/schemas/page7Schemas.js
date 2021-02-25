/* eslint-disable max-len */
export const page7Schema = {
  type: 'object',
  title: 'Procedures',
  properties: {
    procedureDescription: {
      type: 'string',
      title: 'Describe the procedures for this research. Do not attach grant applications or similar documents. Information in this application must be sufficient to fully explain the procedures without such documents.',
    },
  },
};

export const page7UiSchema = {
  classNames: 'column-span-12',
  procedureDescription: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea'
  },
};
