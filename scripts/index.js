import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createTheme, GlobalStyles } from './utilities/style-utils';
import SharedProviders from '@hooks/internal/SharedProviders';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import SWRProvider from './utilities/SWRProvider';
document.body.classList.add('loaded');
document.querySelector('#critical-css').remove();

render(
    <ThemeProvider theme={createTheme()}>
        <ErrorBoundary>
            <BrowserRouter>
                <Switch>
                    <Route path="/:currentListId?">
                        <SWRProvider>
                            <SharedProviders>
                                <GlobalStyles />
                                <App />
                            </SharedProviders>
                        </SWRProvider>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ErrorBoundary>
    </ThemeProvider>,
    document.querySelector('.main-container')
);

import('@utilities/webfontloader').then(webfontloader =>
    webfontloader.default()
);
