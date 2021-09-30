import.meta.hot;

import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from '@hooks/useDarkMode';

import { ThemeProvider, GlobalStyles } from './utilities/ThemeProvider';
import SharedProviders from '@hooks/internal/SharedProviders';
// import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import SWRProvider from './utilities/SWRProvider';
import './utilities/ServiceWorkerRegister';
import App from './App';

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

document.body.classList.add('loaded');
document.querySelector('#critical-css').remove();
