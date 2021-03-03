/* eslint-disable max-len */
export const page11Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    personalIdentifiers: {
      type: 'object',
      title: 'Personal Identifiers',
      properties: {
        usePersonalIdentifiers: {
          type: 'boolean',
          title: 'Will you be using any of the following personal identifiers?',
          enumNames: ['Yes', 'No'],
        },
      },
      dependencies: {
        usePersonalIdentifiers: {
          oneOf: [
            {
              properties: {
                usePersonalIdentifiers: {
                  enum: [true],
                },
                personalIdentifierTypes: {
                  type: 'array',
                  title: 'If yes, check all that apply.',
                  items: {
                    type: 'string',
                    enum: [
                      'Name',
                      'Address (all geographic subdivisions smaller than state, including street address, city, county, and zip code)',
                      'Dates (all elements of dates related to an individual, except years, including birth date, admission date, discharge date, date of death, and exact age if over 89)',
                      'Telephone Numbers',
                      'Fax Number',
                      'Email Address',
                      'Social Security Number',
                      'Medical Record Number',
                      'Health Plan Beneficiary Number',
                      'Account Number',
                      'Certificate or License Number',
                      'Vehicle Identifier',
                      'Device (e.g. cell phone or computer) identifier',
                      'Web URL',
                      'Internet Protocol (IP) Address',
                      'Finger or Voice Print or Other Biometric Identifier',
                      'Photographic Image - no limited to images of the face.',
                      'Any other characteristic that could uniquely identify the individual',
                    ],
                  },
                  // minItems: 1,
                  uniqueItems: true,
                },
                explainObtainingConsent: {
                  type: 'string',
                  title: 'Explain how consent was or will be obtained from the individuals for your use of this information.',
                },
                explainWhyConsentCannotBeObtained: {
                  type: 'string',
                  title: 'If you are requesting a HIPAA Waiver of Authorization, explain why consent cannot be obtained from the individuals.'
                },
              },
            },
            {
              properties: {
                usePersonalIdentifiers: {
                  enum: [false],
                },
              },
            },
          ],
        }
      }
    },
  },
};

export const page11UiSchema = {
  personalIdentifiers: {
    classNames: 'column-span-12 grid-container',
    usePersonalIdentifiers: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
    personalIdentifierTypes: {
      classNames: 'column-span-12',
      'ui:widget': 'checkboxes',
    },
    explainObtainingConsent: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
    explainWhyConsentCannotBeObtained: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
  },
};
