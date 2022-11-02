export const LARGE = 1024;
export const MEDIUM = 640;
export const SMALL = 0;

export const QUERIES = {
    large: `@media (min-width: ${LARGE}px)`,
    medium: `@media (min-width: ${MEDIUM}px)`,
    small: `@media (min-width: ${SMALL}px)`
} as const;

export const DEFAULT_LIST_COLOR = '#666666';
