import { useEffect } from 'react';

import { configure } from 'lattice';

import AccessRequestContainer from '../src/AccessRequestContainer';

export default {
  title: 'Access Request/AccessRequestContainer',
  component: AccessRequestContainer
};

/* eslint-disable react/jsx-props-no-spreading */
const Template = (args) => {
  const { jwt } = args;
  useEffect(() => {
    configure({
      baseUrl: 'production',
      authToken: jwt
    });
  }, [jwt]);
  return <AccessRequestContainer {...args} />;
};

export const Live = Template.bind({});
Live.args = {
  jwt: '123',
  organizationId: '00000000-0000-0000-0000-000000000000',
  match: {},
  root: '/'
};
