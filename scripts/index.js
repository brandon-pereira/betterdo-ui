import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { createTheme, GlobalStyles } from './utilities/style-utils';
import { BrowserRouter } from 'react-router-dom';
import SharedProviders from '@hooks/internal/SharedProviders';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
document.body.classList.add('loaded');
document.querySelector('#critical-css').remove();

render(
    <ThemeProvider theme={createTheme()}>
        <BrowserRouter>
            <GlobalStyles />
            <SharedProviders>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </SharedProviders>
        </BrowserRouter>
    </ThemeProvider>,
    document.querySelector('.main-container')
);

import('@utilities/webfontloader').then(webfontloader =>
    webfontloader.default()
);
