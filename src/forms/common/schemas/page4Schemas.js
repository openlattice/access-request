/* eslint-disable max-len */
export const page4Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    institutionalAffiliation: {
      type: 'object',
      title: 'Institutional Affiliation',
      attachments: true,
      properties: {
        institutionName: {
          type: 'string',
          title: 'Institution Name',
        },
        institutionType: {
          type: 'array',
          title: 'Check all that apply',
          items: {
            type: 'string',
            enum: [
              'For-profit Educational Institution',
              'Non-profit Educational Institution',
              'Another non-profit entity requesting education-related data',
              'Research Institution',
            ],
          },
          // minItems: 1,
          uniqueItems: true,
        },
        responsibleOfficial: {
          type: 'object',
          title: 'Responsible Official',
          properties: {
            name: {
              type: 'string',
              title: 'Name',
            },
            title: {
              type: 'string',
              title: 'Title',
            },
            phoneNumber: {
              type: 'string',
              title: 'Phone Number',
            },
            email: {
              type: 'string',
              title: 'Institutional Email',
            },
          },
        },
        irbApproval: {
          type: 'boolean',
          title: "Has the institution's IRB reviewed and approved this project? If Yes, upload a copy of the approval letter.",
          enumNames: ['Yes', 'No'],
        },
        irbRequestingCPHSReview: {
          type: 'boolean',
          title: "Is the institution's IRB requesting to rely upon CPHS review? If Yes, upload a signed copy of the form available on the CPHS website.",
          enumNames: ['Yes', 'No'],
        },
        cphsRequestingIRBReview: {
          type: 'boolean',
          title: "Is the CPHS being requested to rely upon the institution's IRB or another IRB? If Yes, please specify the IRB and the justification.",
          enumNames: ['Yes', 'No'],
        },
      },
    },
  },
};

export const page4UiSchema = {
  institutionalAffiliation: {
    classNames: 'column-span-12 grid-container',
    institutionName: {
      classNames: 'column-span-12',
    },
    institutionType: {
      classNames: 'column-span-12',
      'ui:widget': 'checkboxes',
      'ui:options': {
        withOther: true
      },
    },
    responsibleOfficial: {
      classNames: 'column-span-12 grid-container',
      name: {
        classNames: 'column-span-12',
      },
      title: {
        classNames: 'column-span-12',
      },
      phoneNumber: {
        classNames: 'column-span-12',
      },
      email: {
        classNames: 'column-span-12',
      },
    },
    irbApproval: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
    irbRequestingCPHSReview: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
    cphsRequestingIRBReview: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
  },
};
