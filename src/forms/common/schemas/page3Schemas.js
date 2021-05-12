/* eslint-disable max-len */
export const page3Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    projectUtilization: {
      type: 'object',
      title: 'Project Utilization',
      attachments: true,
      properties: {
        projectUtilizationType: {
          type: 'array',
          title: 'How will the project be utilized?',
          description: 'Check all that apply.\nNote: If you believe the project should be considered "not research" then you must submit the Determination Request Form from the Committee for the Protection of Human Subjects website rather than this form.',
          items: {
            type: 'string',
            enum: [
              'Public health surveillance (must be conducted by public health authority)',
              'Program evaluation (used only for internal program improvement purposes)',
              'Generalizable knowledge (publication in scientific journals, scientific presentations, etc.)'
            ]
          },
          // minItems: 1,
          uniqueItems: true,
        },
      },
    },
  }
};

export const page3UiSchema = {
  projectUtilization: {
    classNames: 'column-span-12',
    projectUtilizationType: {
      classNames: 'column-span-12',
      'ui:widget': 'checkboxes',
      'ui:options': {
        withOther: true
      }
    },
  }
};
