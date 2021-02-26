/* eslint-disable max-len */
export const page8Schema = {
  type: 'object',
  title: 'Human Subjects',
  properties: {
    humanSubjectInvolvement: {
      type: 'boolean',
      title: 'Does the project involve contact with human subjects?',
      enumNames: ['Yes', 'No'],
    },
  },
  dependencies: {
    humanSubjectInvolvement: {
      oneOf: [
        {
          properties: {
            humanSubjectInvolvement: {
              enum: [true],
            },
            humanSubjectDescription: {
              type: 'string',
              title: 'Please describe the nature of the contact (including surveys, interviews, focus groups, etc.) and how long that contact will last (e.g. participants will be interviewed on three occasions for approximately 50 minutes, so the total time for their participation will be 2.5 hours). Explain how the human subjects will be selected, specifying inclusion and exclusion criteria.'
            },
            specialPopulations: {
              type: 'array',
              title: 'If your study involves contact with human subjects, will it be with any of the special populations listed below?',
              description: 'Check all that apply and upload a completed check list from the CPHS website for populations designated with an asterisk.',
              items: {
                type: 'string',
                enum: [
                  'Children*',
                  'Foster Children',
                  'Prisoners*',
                  'Pregnant Women*',
                  'Human Fetuses',
                  'Neonates*',
                  'Individuals with Impaired Decision-making Ability',
                  'Economically or Educationally Disadvantaged Persons',
                ],
              },
              // minItems: 1,
              uniqueItems: true,
            },
            descriptionOfProceduresObtainingInformedConsent: {
              type: 'string',
              title: 'Provide a description of procedures to be used in obtaining and documenting informed consent (or for minors, informed assent) from participants. See instructions and examples on the CPHS website.'
            },
            consentAttachmentDescription: {
              type: 'string',
              title: 'Attach copies of consent/assent forms and any other letters, information sheets, or verbal scripts that will be used to obtain informed consent/assent. Also attach the Participant’s Bill of Rights (download it from the CPHS website).\nSee examples of consent and assent forms on the CPHS website. Be sure to include a concise explanation of key information for participants at the beginning of your consent or assent form, as shown in the examples on the website. The same elements that are required in a consent form must be adequately covered in an assent form.\nAssent forms must be understandable to children who are 7-17 years of age. The reading level must be age appropriate, and a shortened form may be needed for younger children or those with more limited reading ability. Different versions of the assent form may be needed if the study involves children of significantly different ages. A question-and-answer format, as shown in the CPHS example of an assent form, may be especially appropriate.'
            },
            consentWaiverDescription: {
              type: 'string',
              title: 'CPHS may approve the use of a consent/assent procedure which does not include, or which alters, some or all of the elements of informed consent/assent. If a waiver or alteration is being requested, attach a document that explains how the criteria for informed consent or assent will be satisfied.'
            }
          },
        },
        {
          properties: {
            humanSubjectInvolvement: {
              enum: [false],
            },
          },
        },
      ]
    }
  },
};

export const page8UiSchema = {
  classNames: 'column-span-12',
  humanSubjectInvolvement: {
    classNames: 'column-span-12',
    'ui:widget': 'radio'
  },
  humanSubjectDescription: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea'
  },
  specialPopulations: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
    'ui:options': {
      withNone: true,
      noneText: 'None of the above'
    },
  },
  descriptionOfProceduresObtainingInformedConsent: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  },
  consentAttachmentDescription: {
    classNames: 'column-span-12',
    'ui:field': 'ParagraphField',
  },
  consentWaiverDescription: {
    classNames: 'column-span-12',
    'ui:field': 'ParagraphField',
  }
};
