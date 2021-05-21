/* eslint-disable max-len */
export const page12Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    dataUseAgreement: {
      type: 'object',
      title: 'Data Use Agreement',
      attachments: true,
      properties: {
        obtainDataUseAgreement: {
          type: 'boolean',
          title: 'Will you obtain a Data Use Agreement (DUA) with each department from which you are requesting data? If yes, upload the document(s).',
          enumNames: ['Yes', 'No'],
        },
      },
      dependencies: {
        obtainDataUseAgreement: {
          oneOf: [
            {
              properties: {
                obtainDataUseAgreement: {
                  enum: [true],
                },
                cphsApprovalRequiredForExecution: {
                  type: 'boolean',
                  title: 'If Yes, is CPHS approval required for execution of the DUA?',
                  enumNames: ['Yes', 'No'],
                }
              },
            },
            {
              properties: {
                obtainDataUseAgreement: {
                  enum: [false],
                },
                explainWhyDUANotObtained: {
                  type: 'string',
                  title: 'If No, please explain.'
                }
              },
            },
          ],
        },
      },
    },
  },
};

export const page12UiSchema = {
  dataUseAgreement: {
    classNames: 'column-span-12 grid-container',
    obtainDataUseAgreement: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
    cphsApprovalRequiredForExecution: {
      classNames: 'column-span-12',
      'ui:widget': 'radio',
    },
    explainWhyDUANotObtained: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea',
    },
  },
};
