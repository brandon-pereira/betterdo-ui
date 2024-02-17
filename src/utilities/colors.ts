import { Colord, colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

import { DEFAULT_LIST_COLOR } from '../constants';

extend([a11yPlugin]);

export function checkIfColorGoodContrast(
    textColor: string,
    backgroundColor: string
) {
    const isColorGoodContrast = colord(textColor).isReadable(
        colord(backgroundColor)
    );

    return isColorGoodContrast;
}

export function getAccessibleAccent(color: string | Colord) {
    if (typeof color === 'string') {
        color = colord(color);
    }
    if (!color) {
        return colord(DEFAULT_LIST_COLOR);
    }
    const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // the higher the number, the less lightly it gets tinted
    const requirement = isDarkMode ? 0.33 : 0.9;
    // 0 is black, 1 is white
    const luminance = color.luminance();
    // if the color is too light, darken it
    if (isSafari && luminance > requirement) {
        return getAccessibleAccent(color.darken(0.05));
    }
    return color;
}
