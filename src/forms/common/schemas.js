export const schema = {
  type: 'object',
  title: 'Common Application',
  properties: {
    personSection: {
      type: 'object',
      title: 'Personal Information',
      properties: {
        firstName: {
          type: 'string',
          title: 'First name',
        },
        middleName: {
          type: 'string',
          title: 'Middle name'
        },
        lastName: {
          type: 'string',
          title: 'Last name',
        },
        dob: {
          type: 'string',
          format: 'date',
          title: 'Date of Birth',
        },
        phone: {
          type: 'string',
          title: 'Phone #',
        },
      },
      required: [
        'firstName',
        'lastName',
        'dob'
      ],
    },
  }
};

export const uiSchema = {
  personSection: {
    classNames: 'column-span-12 grid-container',
    firstName: {
      classNames: 'column-span-4'
    },
    middleName: {
      classNames: 'column-span-4'
    },
    lastName: {
      classNames: 'column-span-4'
    },
    dob: {
      classNames: 'column-span-4',
      'ui:widget': 'DateWidget',
    },
    sex: {
      classNames: 'column-span-4'
    },
    phone: {
      classNames: 'column-span-4'
    },
    ssn: {
      classNames: 'column-span-4'
    },
  },
};
