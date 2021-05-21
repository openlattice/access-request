/* eslint-disable max-len */
export const page21Schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    departmentSupportDataReleaseLetter: {
      type: 'object',
      title: 'Department Support/Data Release Letter',
      attachments: true,
      properties: {
        departmentSupportDataReleaseLetter: {
          type: 'string',
          title: 'Obtain and upload a department support/data release letter. This is a statement from the state agency or department you are receiving information from. It must be on that agency’s/department’s letterhead and should indicate both (1) that the release of the desired data is legal and (2) that the agency is willing to release the data to you. If you are not receiving data, the letter should indicate that the department is supportive of your research.',
        },
      },
    },
  },
};

export const page21UiSchema = {
  departmentSupportDataReleaseLetter: {
    classNames: 'column-span-12 grid-container',
    departmentSupportDataReleaseLetter: {
      classNames: 'column-span-12',
      'ui:field': 'ParagraphField',
    },
  },
};
