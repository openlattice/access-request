/* eslint-disable max-len */
export const page10Schema = {
  type: 'object',
  title: 'Protected Health Information',
  properties: {
    involveProtectedHealthInformation: {
      type: 'boolean',
      title: 'Does the project involve accessing protected health information from a state department?',
      enumNames: ['Yes', 'No'],
    }
  },
  dependencies: {
    involveProtectedHealthInformation: {
      oneOf: [
        {
          properties: {
            involveProtectedHealthInformation: {
              enum: [true],
            },
            specifyProtectedHealthInformation: {
              type: 'string',
              title: 'If Yes, specify the department, the data set, and attach a list of the data elements you are requesting. For each data element, list the range of dates you are requesting and a justification for the data element. Access will not be granted for data elements lacking justification or requests for more than the minimum data necessary to perform the research. Also upload the application and data dictionary you have submitted to the department. If requesting death data, describe and justify any risk to the estate of a deceased or to a living person by use of the death data.',
            },
            dataSource: {
              type: 'string',
              title: 'Data Source',
              enum: [
                'California Department of Aging',
                'California Department of Child Support Services',
                'California Department of Community Services & Development',
                'California Department of Developmental Services',
                'California Department of Healthcare Services',
                'California Department of Managed Healthcare',
                'California Department of Public Health',
                'California Department of Rehabilitation',
                'California Department of Social Services',
                'California Department of State Hospitals',
                'Office of Health Information Integrity',
                'Office of Law Enforcement Support',
                'Office of Statewide Health Planning & Development',
                'Office of Systems Integration',
                'Office of the Patient Advocate',
                'Other State Department',
              ]
            },
            dataSet: {
              type: 'string',
              title: 'Data Set',
            }
          },
        },
        {
          properties: {
            involveProtectedHealthInformation: {
              enum: [false],
            },
          },
        },
      ],
    }
  }
};

export const page10UiSchema = {
  involveProtectedHealthInformation: {
    classNames: 'column-span-12',
    'ui:widget': 'radio',
  },
  specifyProtectedHealthInformation: {
    classNames: 'column-span-12',
    'ui:field': 'ParagraphField',
  },
  dataSource: {
    classNames: 'column-span-12',
  },
  dataSet: {
    classNames: 'column-span-12',
  }
};
