import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from '@hooks/useDarkMode';

import { ThemeProvider, GlobalStyles } from './utilities/style-utils';
import SharedProviders from '@hooks/internal/SharedProviders';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import SWRProvider from './utilities/SWRProvider';
import './utilities/ServiceWorkerRegister';

document.body.classList.add('loaded');
document.querySelector('#critical-css').remove();

render(
    <HelmetProvider>
        <GlobalStyles />
        <DarkModeProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <HashRouter>
                        <Switch>
                            <Route path="/:currentListId?">
                                <SWRProvider>
                                    <SharedProviders>
                                        <App />
                                    </SharedProviders>
                                </SWRProvider>
                            </Route>
                        </Switch>
                    </HashRouter>
                </ErrorBoundary>
            </ThemeProvider>
        </DarkModeProvider>
    </HelmetProvider>,

    document.querySelector('.main-container')
);

import('@utilities/webfontloader').then(webfontloader =>
    webfontloader.default()
);
