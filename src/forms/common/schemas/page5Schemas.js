/* eslint-disable max-len */
export const page5Schema = {
  type: 'object',
  title: 'Conflict of Interest',
  properties: {
    conflictOfInterest: {
      type: 'boolean',
      title: 'Do any members of the research team, or their spouses or dependent children, have any financial interest related to the work to be conducted as part of this project that will, or could be perceived to, affect the objective conduct of the research, including the interpretation and publication of the findings?',
      description: 'Note: financial interests include but are not limited to:\n• Present or anticipated ownership of stock, stock options, or other financial obligations of the source of funding.\n• Receipt or expectation of payment of any sort in connection with papers, symposia, consulting, editing, etc. from the source of funding.\n• The sale or licensing or anticipated sale or licensing of medical or other products or intellectual property, such as patents, copyrights, or trade secrets to the source of funding or other entities.\n• Any past, present or anticipated receipt of money or other valuable consideration from the source of research funding by the researcher(s), the family of the researcher(s), the research institution, or by an institution in which the researcher(s) or the family of the researcher(s) has an interest as owner, creditor, or officer.',
      enumNames: ['Yes', 'No'],
    },
  },
  dependencies: {
    conflictOfInterest: {
      oneOf: [
        {
          properties: {
            conflictOfInterest: {
              enum: [true]
            },
            interestedIndividuals: {
              type: 'array',
              title: 'Interested Individuals',
              items: {
                type: 'object',
                properties: {
                  firstName: {
                    type: 'string',
                    title: 'First Name',
                  },
                  lastName: {
                    type: 'string',
                    title: 'Last Name',
                  },
                  conflictDescription: {
                    type: 'string',
                    title: 'Conflict Description',
                  },
                },
              },
              default: [{}],
            },
          },
        },
        {
          properties: {
            conflictOfInterest: {
              enum: [false]
            },
          }
        },
      ]
    }
  },
};

export const page5UiSchema = {
  classNames: 'column-span-12',
  conflictOfInterest: {
    classNames: 'column-span-12',
    'ui:widget': 'radio'
  },
  interestedIndividuals: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Individual',
      orderable: false
    },
    items: {
      classNames: 'grid-container',
      firstName: {
        classNames: 'column-span-6'
      },
      lastName: {
        classNames: 'column-span-6'
      },
      conflictDescription: {
        classNames: 'column-span-12',
        'ui:widget': 'textarea'
      }
    }
  }
};
