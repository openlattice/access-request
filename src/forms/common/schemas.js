export const schema = {
  definitions: {
    person: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
        },
        title: {
          type: 'string',
          title: 'Title',
        },
        address: {
          type: 'string',
          title: 'Address',
        },
        phoneNumber: {
          type: 'string',
          title: 'Phone Number',
        },
        email: {
          type: 'string',
          title: 'Email'
        }
      }
    }
  },
  type: 'object',
  title: 'Common Application',
  properties: {
    projectAdministrativeInformation: {
      type: 'object',
      title: 'Project Administration Information',
      properties: {
        projectTitle: {
          type: 'string',
          title: 'Project Title',
        },
        principalInvestigator: {
          title: 'Principal Investigator',
          $ref: '#/definitions/person',
        },
        coPrincipalInvestigator: {
          title: 'Co-Principal Investigator',
          $ref: '#/definitions/person',
        },
        projectContact: {
          title: 'Project Contact',
          $ref: '#/definitions/person',
        },
      }
    },
  }
};

export const uiSchema = {
  projectAdministrativeInformation: {
    classNames: 'column-span-12 grid-container',
    projectTitle: {
      classNames: 'column-span-12',
    },
    principalInvestigator: {
      classNames: 'column-span-12 grid-container',
      firstName: {
        classNames: 'column-span-6',
      },
      lastName: {
        classNames: 'column-span-6',
      },
      title: {
        classNames: 'column-span-12',
      },
      address: {
        classNames: 'column-span-12',
      },
      phoneNumber: {
        classNames: 'column-span-6',
      },
      email: {
        classNames: 'column-span-6',
      },
    },
    coPrincipalInvestigator: {
      classNames: 'column-span-12 grid-container',
      firstName: {
        classNames: 'column-span-6',
      },
      lastName: {
        classNames: 'column-span-6',
      },
      title: {
        classNames: 'column-span-12',
      },
      address: {
        classNames: 'column-span-12',
      },
      phoneNumber: {
        classNames: 'column-span-6',
      },
      email: {
        classNames: 'column-span-6',
      },
    },
    projectContact: {
      classNames: 'column-span-12 grid-container',
      firstName: {
        classNames: 'column-span-6',
      },
      lastName: {
        classNames: 'column-span-6',
      },
      title: {
        classNames: 'column-span-12',
      },
      address: {
        classNames: 'column-span-12',
      },
      phoneNumber: {
        classNames: 'column-span-6',
      },
      email: {
        classNames: 'column-span-6',
      },
    },
  },
};
