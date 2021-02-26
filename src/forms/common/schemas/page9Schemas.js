/* eslint-disable max-len */
export const page9Schema = {
  type: 'object',
  title: 'Benefits and Risks',
  properties: {
    benefitsDescription: {
      type: 'string',
      title: 'Describe the benefits, if any, to the subjects or to society from conducting this project. If no direct benefit is anticipated for the subjects, state that clearly.',
    },
    risksDescription: {
      type: 'string',
      title: 'Describe the possible risks to participants: physical, psychological, social, economic, loss of data security, and/or loss of confidentiality.',
    },
    justificationDescription: {
      type: 'string',
      title: 'Describe and justify whether the research is minimal risk or greater than minimal risk.'
    },
  },
};

export const page9UiSchema = {
  benefitsDescription: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  },
  risksDescription: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  },
  justificationDescription: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  },
};
