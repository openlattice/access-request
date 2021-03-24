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
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbG9tb25Ab3BlbmxhdHRpY2UuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInVzZXJfaWQiOiJnb29nbGUtb2F1dGgyfDExMTIxNzkwNTcyOTE4NzM3ODczNCIsInVzZXJfbWV0YWRhdGEiOnt9LCJhcHBfbWV0YWRhdGEiOnsicm9sZXMiOlsiQXV0aGVudGljYXRlZFVzZXIiLCJhZG1pbiJdLCJvcmdhbml6YXRpb25zIjpbIjAwMDAwMDAwLTAwMDAtMDAwMS0wMDAwLTAwMDAwMDAwMDAwMCJdLCJhY3RpdmF0ZWQiOiJhY3RpdmF0ZWQifSwibmlja25hbWUiOiJzb2xvbW9uIiwicm9sZXMiOlsiQXV0aGVudGljYXRlZFVzZXIiLCJhZG1pbiJdLCJpc3MiOiJodHRwczovL29wZW5sYXR0aWNlLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTIxNzkwNTcyOTE4NzM3ODczNCIsImF1ZCI6Im84WTJVMnpiNUl3bzAxamR4TU4xVzJhaU44UHh3VmpoIiwiaWF0IjoxNjE2MDg2Njk1LCJleHAiOjE2MTYxMjI2OTV9.fvXK1TlMq9t5se7hH80SgakUPFoJHW5nsOyDFmUL-FM',
  organizationId: '1d5aa1f4-4d22-46a5-97cd-dcc6820e7ff8',
  match: {},
  root: '/'
};
