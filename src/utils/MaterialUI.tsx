import React from 'react';
import { Theme,  createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const jssID: string = 'jss-server-side';

export const createTheme = (theme?: Theme) => createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
    type: 'light'
  },
  ...theme,
});

export class RemoveStylesOnClient extends React.Component {
  componentDidMount() {
    const jssStyles: HTMLElement = document.getElementById(jssID);

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return this.props.children;
  }
}
