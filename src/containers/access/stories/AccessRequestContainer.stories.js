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
  organizationId: '1d5aa1f4-4d22-46a5-97cd-dcc6820e7ff8',
  match: {},
  root: '/'
};
