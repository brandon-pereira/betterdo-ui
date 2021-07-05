import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

import { createTheme, GlobalStyles } from './utilities/style-utils';
import SharedProviders from '@hooks/internal/SharedProviders';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import SWRProvider from './utilities/SWRProvider';
import './utilities/ServiceWorkerRegister';

document.body.classList.add('loaded');
document.querySelector('#critical-css').remove();

render(
    <ThemeProvider theme={createTheme()}>
        <HelmetProvider>
            <GlobalStyles />
            <ErrorBoundary>
                <HashRouter>
                    <Switch>
                        <Route path="/:currentListId?">
                            <SWRProvider>
                                <DndContext
                                    onDragEnd={a =>
                                        console.log('ON DRAG END', a)
                                    }
                                >
                                    {createPortal(
                                        <DragOverlay>
                                            <div>HI</div>
                                        </DragOverlay>,
                                        document.body
                                    )}
                                    <SharedProviders>
                                        <App />
                                    </SharedProviders>
                                </DndContext>
                            </SWRProvider>
                        </Route>
                    </Switch>
                </HashRouter>
            </ErrorBoundary>
        </HelmetProvider>
    </ThemeProvider>,
    document.querySelector('.main-container')
);

import('@utilities/webfontloader').then(webfontloader =>
    webfontloader.default()
);
