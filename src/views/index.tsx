import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import img from 'Assets/img/200.png';
import 'Assets/css/styles.css';
import Baz from './common/Baz';

import UniversalComponent from './UniversalComponent';

const styles = (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  card: {
    padding: '20px',
    marginTop: '20px',
  },
  bottom: {
    marginBottom: '50px',
  }
});

export type Props = {
  classes: {
    appBar: string;
    icon: string;
    heroUnit: string;
    heroContent: string;
    heroButtons: string;
    card: string;
    bottom: string;
  };
  history: {
    location: {
      pathname: string;
    };
  };
};

export type State = {
  page: string;
};

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { history } = props;
    const { location: { pathname } } = history;

    let page = null;

    switch (pathname) {
      case '/route/c':
        page = 'Bar';
        break;

      case '/route/d':
        page = 'Foo';
        break;

      case '/route/apollo/a':
        page = 'ApolloBar';
        break;

      case '/route/apollo/b':
        page = 'ApolloFoo';
        break;

      default:
        page = 'Bar';
        break;
    }

    this.state = { page };
  }

  onClick = (page: State['page']) => {
    this.setState({
      page,
    });
  }

  render() {
    const { page } = this.state;
    const { classes } = this.props;

    const buttons: JSX.Element[] = [
      <Button variant="contained" color="primary" onClick={() => this.onClick('Bar')}>Bar</Button>,
      <Button variant="contained" color="primary" onClick={() => this.onClick('Foo')}>Foo</Button>,
      <Button variant="contained" color="primary" onClick={() => this.onClick('ApolloBar')}>ApolloBar</Button>,
      <Button variant="contained" color="primary" onClick={() => this.onClick('ApolloFoo')}>ApolloFoo</Button>,
    ];

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <HomeIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              React SSR
            </Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.bottom}>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                React SSR ⚛
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                This React SSR boilerplate support: TypeScript, Babel7, Webpack4, CodeSplitting, SSR, SPA, and more... ❤️
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  {buttons.map((element, index) => <Grid item key={index}>{element}</Grid>)}
                </Grid>
              </div>
            </div>
          </div>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Card className={classes.card}>
                <UniversalComponent page={`common/${page}`} />
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <img src={img} alt="" style={{ display: 'block', marginTop: '30px' }} />
            </Grid>
            <Grid item>
              <img src={img} alt="" style={{ display: 'block', marginTop: '30px' }} />
            </Grid>
            <Grid item>
              <img src={img} alt="" style={{ display: 'block', marginTop: '30px' }} />
            </Grid>
            <Grid item>
              <img src={img} alt="" style={{ display: 'block', marginTop: '30px' }} />
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
