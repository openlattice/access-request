/* eslint-disable max-len */
export const page20Schema = {
  type: 'object',
  title: 'Data Breach Compliance',
  properties: {
    dataBreachCompliance: {
      type: 'boolean',
      title: 'Do you agree to comply with CHHS department-specific instructions in the event of a data breach?',
      enumNames: ['Yes', 'No'],
    },
  },
  dependencies: {
    dataBreachCompliance: {
      oneOf: [
        {
          properties: {
            dataBreachCompliance: {
              enum: [true],
            },
          },
        },
        {
          properties: {
            dataBreachCompliance: {
              enum: [false],
            },
            explainDataBreachNoncompliance: {
              type: 'string',
              title: 'If No, explain.'
            }
          },
        },
      ],
    },
  },
};

export const page20UiSchema = {
  dataBreachCompliance: {
    classNames: 'column-span-12',
    'ui:widget': 'radio',
  },
  explainDataBreachNoncompliance: {
    classNames: 'column-span-12',
    'ui:widget': 'textarea',
  }
};
