/* eslint-disable max-len */
export const page2Schema = {
  type: 'object',
  title: 'Indicate the type of funding for this research',
  properties: {
    typeOfFunding: {
      type: 'array',
      title: 'Check all that apply',
      items: {
        type: 'string',
        enum: [
          'Federally Funded',
          'State Funded',
          'University Funded',
          'Privately Funded'
        ]
      },
      minItems: 1,
      uniqueItems: true,
    },
    fundingDescription: {
      type: 'string',
      title: 'Please describe the source of funding and attach a budget showing how costs for the study will be covered.'
    }
  }
};

export const page2UiSchema = {
  classNames: 'column-span-12',
  typeOfFunding: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
    'ui:options': {
      withOther: true
    }
  },
  fundingDescription: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea'
  }
};
