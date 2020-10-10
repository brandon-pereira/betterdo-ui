import { COLORS } from '../constants';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html {
        overflow: hidden;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        html.wf-notosans-n4-active & {
            font-family: 'Noto Sans', sans-serif;
        }
        margin: 0;
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

export const getColor = colorName => ({ theme }) => theme.colors[colorName];

export const createTheme = () => ({
    colors: COLORS
});
