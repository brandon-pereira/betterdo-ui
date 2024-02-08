import {
    createGlobalStyle,
    ThemeProvider as _ThemeProvider
} from 'styled-components';
import 'simplebar-react/dist/simplebar.min.css';

import { LIGHT_THEME, DARK_THEME } from '../theme';

import useDarkMode from '@hooks/useDarkMode';

export function ThemeProvider({ children }: { children: React.ReactChild }) {
    const [isDarkMode] = useDarkMode();

    return (
        <_ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
            {children}
        </_ThemeProvider>
    );
}

export const GlobalStyles = createGlobalStyle`    
    html {
        overflow: hidden;
    }
    body {
        font-family:  'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        margin: 0;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        &.loaded {
            .loader {
                display: none;
            }
        }
    }

    html.app,
    .main-container,
    .app {
        width: 100vw;
        height: 100vh;
    }
`;
