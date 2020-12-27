import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import theme from './theme';
import Nav from "../components/Nav"
import { Box } from '@material-ui/core';
import { Router } from "next/dist/client/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });

Router.events.on(`routeChangeStart`, () => {
   NProgress.start()
})
Router.events.on(`routeChangeComplete`, () => {
   NProgress.done()
})
Router.events.on(`routeChangeError`, () => {
   NProgress.done()
})

export default class MyApp extends App {
   componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
         jssStyles.parentElement.removeChild(jssStyles);
      }
   }

   render() {
      const { Component, pageProps } = this.props;

      return (
         <React.Fragment>
            <Head>
               <title>My page</title>
               <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <Nav />
            <ThemeProvider theme={theme}>
               {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
               <CssBaseline />
               <Box marginTop={8}>
                  <Component {...pageProps} />
               </Box>
            </ThemeProvider>
         </React.Fragment>
      );
   }
}