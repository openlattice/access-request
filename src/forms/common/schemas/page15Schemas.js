/* eslint-disable max-len */
export const page15Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    dataLinkage: {
      type: 'object',
      title: 'Data Linkage',
      properties: {
        willDataBeLinkedToAnotherDataSet: {
          type: 'boolean',
          title: 'Will data be linked to another data set?',
          enumNames: ['Yes', 'No'],
        },
      },
      dependencies: {
        willDataBeLinkedToAnotherDataSet: {
          oneOf: [
            {
              properties: {
                willDataBeLinkedToAnotherDataSet: {
                  enum: [true],
                },
                whoWillLinkData: {
                  type: 'string',
                  title: 'If yes, who will do the linking? Your research team? A State Department? If so, which one(s)? If you will provide a finder file for a state department to perform the linkage, please describe. A third party? If a third party will be used to link data, provide evidence of the third party’s ability to protect personally identifiable data, including the third party’s ability to comply with all CPHS data security requirements.',
                },
                whatProceduresSoftwareForLinking: {
                  type: 'string',
                  title: 'What procedures and/or software will be used?',
                },
                whatVariablesUsedForLinking: {
                  type: 'string',
                  title: 'What variables will be used?',
                },
              },
            },
            {
              properties: {
                willDataBeLinkedToAnotherDataSet: {
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

export const page15UiSchema = {
  dataLinkage: {
    classNames: 'column-span-12 grid-container',
    willDataBeLinkedToAnotherDataSet: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
    whoWillLinkData: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
    whatProceduresSoftwareForLinking: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
    whatVariablesUsedForLinking: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
  },
};
