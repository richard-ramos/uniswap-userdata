import React, { Component } from 'react';
import './app.css';
import { ApolloProvider } from 'react-apollo';
import client from './api/apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import SectionHeader from './layout/section-header';
import ApplicationData from './layout/application-data';
import Template from './layout/template';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#dc6be5'
    }
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Template>
            <SectionHeader title="🦄 Uniswap - User data" subtitle="Demo project using GraphQL" />
            <ApplicationData />
          </Template>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
