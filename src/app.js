import React, { Component } from 'react';
import './app.css';
import { ApolloProvider } from 'react-apollo';
import client from './api/apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import SectionHeader from './layout/section-header';
import ApplicationData from './layout/application-data';
import Template from './layout/template';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

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
          <I18nextProvider i18n={ i18n }>
            <CssBaseline />
            <Template>
              <SectionHeader title="🦄 Uniswap - User data" subtitle="by @rramos" />
              <ApplicationData />
            </Template>
          </I18nextProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
