/* eslint-disable max-len */
export const page6Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    majorResearchQuestions: {
      type: 'object',
      title: 'Major Research Questions',
      properties: {
        majorResearchQuestions: {
          type: 'string',
          title: 'What are the major research questions to be addressed in this project? What led to the development of these questions, and why are these questions important? Use terminology that is understandable to the general public.',
        },
      }
    },
  },
};

export const page6UiSchema = {
  majorResearchQuestions: {
    classNames: 'column-span-12 grid-container',
    majorResearchQuestions: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea'
    },
  },
};
