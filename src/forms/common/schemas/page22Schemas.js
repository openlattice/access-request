/* eslint-disable max-len */
export const page22Schema = {
  type: 'object',
  title: 'Data Security Letter',
  properties: {
    dataSecurityLetter: {
      type: 'string',
      title: 'Upload a data security letter, on institutional letterhead, signed by the institution’s Chief Information Officer, Privacy Officer, Security Officer or equivalent and by the Principal Investigator. The letter must provide assurance that the study will meet all CPHS Data Security Requirements (see the CPHS website) and the data security requirements of state agencies from which data is requested. If there are any exceptions, explain why they are necessary and what alternate procedures will provide similar data security. See example of a data security letter on the CPHS website. Attach a data security checklist verifying which requirements are met.',
    },
  },
};

export const page22UiSchema = {
  dataSecurityLetter: {
    classNames: 'column-span-12',
    'ui:field': 'ParagraphField',
  },
};
