/* eslint-disable max-len */
export const page13Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    deidentifiedAnalysis: {
      type: 'object',
      title: 'De-identified Analysis',
      properties: {
        analysisDataDeidentified: {
          type: 'boolean',
          title: 'Will analysis data be de-identified?',
          enumNames: ['Yes', 'No'],
        },
        whichPersonalIdentifiersRemovedOrRetained: {
          type: 'string',
          title: 'What personal identifiers will be removed and which ones, if any, will be retained in the data?'
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
    },
  },
};

export const page13UiSchema = {
  deidentifiedAnalysis: {
    classNames: 'column-span-12 grid-container',
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
    'ui:order': [
      'analysisDataDeidentified',
      'describeWhenAndHowDataIsDeidentified',
      'whichPersonalIdentifiersRemovedOrRetained',
    ],
  },
};
