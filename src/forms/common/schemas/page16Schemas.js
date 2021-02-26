/* eslint-disable max-len */
export const page16Schema = {
  type: 'object',
  title: 'Data Storage Location',
  properties: {
    dataStorageLocation: {
      type: 'object',
      title: 'Where will the data be stored?',
      properties: {
        institutionName: {
          type: 'string',
          title: 'Institution Name',
        },
        physicalAddress: {
          type: 'string',
          title: 'Physical Address',
        },
        secondaryAddress: {
          type: 'string',
          title: 'Secondary Address, if any',
        },
      },
    },
  },
};

export const page16UiSchema = {
  dataStorageLocation: {
    classNames: 'column-span-12 grid-container',
    institutionName: {
      classNames: 'column-span-12',
    },
    physicalAddress: {
      classNames: 'column-span-12',
    },
    secondaryAddress: {
      classNames: 'column-span-12',
    },
  },
};
