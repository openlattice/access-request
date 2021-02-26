/* eslint-disable max-len */
export const page13Schema = {
  type: 'object',
  title: 'De-identified Analysis',
  properties: {
    analysisDataDeidentified: {
      type: 'boolean',
      title: 'Will analysis data be de-identified?',
      enumNames: ['Yes', 'No'],
    },
  },
  dependencies: {
    analysisDataDeidentified: {
      oneOf: [
        {
          properties: {
            analysisDataDeidentified: {
              enum: [true],
            },
            describeWhenAndHowDataIsDeidentified: {
              type: 'string',
              title: 'If yes, describe when and how.',
            },
            whichPersonalIdentifiersRemovedOrRetained: {
              type: 'string',
              title: 'What personal identifiers will be removed and which ones, if any, will be retained in the data?'
            }
          },
        },
        {
          properties: {
            analysisDataDeidentified: {
              enum: [false],
            },
          },
        },
      ],
    },
  },
};

export const page13UiSchema = {
  analysisDataDeidentified: {
    classNames: 'column-span-12',
    'ui:widget': 'radio',
  },
  describeWhenAndHowDataIsDeidentified: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  },
  whichPersonalIdentifiersRemovedOrRetained: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  },
};
