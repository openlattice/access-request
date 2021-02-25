/* eslint-disable max-len */
export const page6Schema = {
  type: 'object',
  title: 'What are the major research questions to be addressed in this project? What led to the development of these questions, and why are these questions important? Use terminology that is understandable to the general public.',
  properties: {
    majorResearchQuestions: {
      type: 'string',
      title: ' ',
    },
  },
};

export const page6UiSchema = {
  classNames: 'column-span-12',
  majorResearchQuestions: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea'
  },
};
