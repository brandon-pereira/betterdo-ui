import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider, GlobalStyles } from './utilities/ThemeProvider';
import SWRProvider from './utilities/SWRProvider';
import App from './App';

import { DarkModeProvider } from '@hooks/useDarkMode';
import SharedProviders from '@hooks/internal/SharedProviders';
import ErrorBoundary from '@components/ErrorBoundary';
import './utilities/ServiceWorkerRegister';

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
