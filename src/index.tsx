import * as ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider, GlobalStyles } from './utilities/ThemeProvider';
import InitialListRedirect from './containers/Redirects/InitialListRedirect';
import SWRProvider from './utilities/SWRProvider';
import App from './App';

import { DarkModeProvider } from '@hooks/useDarkMode';
import SharedProviders from '@hooks/internal/SharedProviders';
import ErrorBoundary from '@components/ErrorBoundary';

import './utilities/ServiceWorkerRegister';

const root = ReactDOM.createRoot(document.querySelector('.main-container')!);

root.render(
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
                                            <InitialListRedirect />
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
    </HelmetProvider>
);
