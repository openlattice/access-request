/* eslint-disable max-len */
export const page14Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    personalIdentifierStorage: {
      type: 'object',
      title: 'Personal Identifier Storage',
      properties: {
        personalIdentifiersStoredSeparately: {
          type: 'boolean',
          title: 'Will personal identifiers be stored separately from analysis data?',
          enumNames: ['Yes', 'No'],
        },
      },
      dependencies: {
        personalIdentifiersStoredSeparately: {
          oneOf: [
            {
              properties: {
                personalIdentifiersStoredSeparately: {
                  enum: [true],
                },
                explainWhenPersonalIdentifiersWillBeDestroyed: {
                  type: 'string',
                  title: 'If Yes, explain when the personal identifiers will be destroyed.',
                },
              },
            },
            {
              properties: {
                personalIdentifiersStoredSeparately: {
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

export const page14UiSchema = {
  personalIdentifierStorage: {
    classNames: 'column-span-12 grid-container',
    personalIdentifiersStoredSeparately: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
    explainWhenPersonalIdentifiersWillBeDestroyed: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
  },
};
