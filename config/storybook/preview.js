/* eslint-disable import/prefer-default-export */

import { addDecorator } from '@storybook/react';
import {
  LatticeLuxonUtils,
  MuiPickersUtilsProvider,
  StylesProvider,
  ThemeProvider,
  lightTheme
} from 'lattice-ui-kit';

addDecorator((storyFn) => (
  <ThemeProvider theme={lightTheme}>
    <MuiPickersUtilsProvider utils={LatticeLuxonUtils}>
      <StylesProvider injectFirst>{storyFn()}</StylesProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
