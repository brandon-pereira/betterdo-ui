import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider, GlobalStyles } from './utilities/ThemeProvider';
import SWRProvider from './utilities/SWRProvider';
import App from './App';

import { DarkModeProvider } from '@hooks/useDarkMode';
import SharedProviders from '@hooks/internal/SharedProviders';
import ErrorBoundary from '@components/ErrorBoundary';
import './utilities/ServiceWorkerRegister';
import InboxRedirect from './containers/Redirects/InboxRedirect';

render(
    <HelmetProvider>
        <GlobalStyles />
        <DarkModeProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <HashRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <SWRProvider>
                                        <SharedProviders>
                                            <InboxRedirect />
                                        </SharedProviders>
                                    </SWRProvider>
                                }
                            />
                            <Route
                                path=":currentListId/*"
                                element={
                                    <>
                                        <SWRProvider>
                                            <SharedProviders>
                                                <App />
                                            </SharedProviders>
                                        </SWRProvider>
                                    </>
                                }
                            />
                        </Routes>
                    </HashRouter>
                </ErrorBoundary>
            </ThemeProvider>
        </DarkModeProvider>
    </HelmetProvider>,
    document.querySelector('.main-container')
);
