import React, { Component } from 'react';
import './app.css';
import { ApolloProvider } from 'react-apollo';
import client from './api/apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import SectionHeader from './layout/section-header';
import ApplicationData from './layout/application-data';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#dc6be5'
    }
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['A500'],
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 20,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    width: 1000
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <Grid container justify="center">
              <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                <Grid item xs={12}>
                  <SectionHeader title="🦄 Uniswap - User data" subtitle="Demo project using GraphQL" />
                  <ApplicationData />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withStyles(styles)(App);
