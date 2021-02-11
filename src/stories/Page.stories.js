import React from 'react';

import * as HeaderStories from './Header.stories';
import { Page } from './Page';

export default {
  title: 'Example/Page',
  component: Page,
};

/* eslint-disable-next-line react/jsx-props-no-spreading */
const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
