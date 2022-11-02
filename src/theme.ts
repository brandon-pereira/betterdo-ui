import { QUERIES } from './constants';

export const BASE_THEME = {
    queries: QUERIES
};

export const LIGHT_THEME = {
    ...BASE_THEME,
    isDarkMode: false,
    colors: {
        navigation: {
            background: '#202020'
        },
        modals: {
            overlayBackground: 'rgba(0,0,0,.5)',
            contentBackground: '#fff',
            listViewAlternateBackground: '#EEE'
        },
        forms: {
            input: {
                color: '#000',
                background: '#FFF',
                boxShadow: 'inset 0 0 0 2px #ccc'
            },
            label: {
                color: '#666'
            },
            selector: {
                background: 'linear-gradient(#fff, #ddd)',
                color: '#000',
                boxShadow: 'inset 0 0 0 1px #a2a2a2, inset 0 -2px #fff'
            }
        },
        body: {
            color: '#222',
            background: '#e4e4e4',
            banner: {
                color: '#999',
                icon: {
                    background: '#cfcfcf',
                    stroke: '#b5b5b5'
                }
            },
            completedTasksButton: {
                borderColor: '#aaa',
                color: '#666',
                textShadow: '0 1px #fff'
            }
        },
        task: {
            background: 'linear-gradient(#fff, #eee)',
            boxShadow: ' 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff',
            color: '#000',
            checkbox: {
                background: '#fff',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.2), 1px 1px #fff'
            },
            checkboxDot: {
                background: 'linear-gradient(#333, #666)'
            },
            lowPriority: {
                background: 'linear-gradient(#eee, #ddd)'
            }
        },
        general: {
            blue: '#2979ff',
            red: '#c62828'
        }
    }
};

export type Theme = typeof LIGHT_THEME;

export const DARK_THEME: Theme = {
    ...BASE_THEME,
    isDarkMode: true,
    colors: {
        navigation: {
            background: '#080808'
        },
        modals: {
            overlayBackground: 'rgba(0,0,0,.7)',
            contentBackground: '#171717',

            listViewAlternateBackground: '#212121'
        },
        forms: {
            input: {
                color: '#fff',
                background: '#1e1e1e',
                boxShadow: 'inset 0 -1px #313131'
            },
            label: {
                color: '#a5a5a5'
            },
            selector: {
                background: 'linear-gradient(#252525, #151515)',
                color: '#b5b5b5',
                boxShadow:
                    'inset 0 0 0 1px rgba(0, 0, 0, 0.9), inset 0 -2px rgba(255, 255, 255, 0.3)'
            }
        },
        body: {
            color: '#d2d2d2',
            background: '#101010',
            banner: {
                color: '#9e9e9e',
                icon: {
                    background: '#191919',
                    stroke: '#282828'
                }
            },
            completedTasksButton: {
                borderColor: '#313131',
                color: '#616161',
                textShadow: 'none'
            }
        },
        task: {
            background: 'linear-gradient(#252525, #1e1e1e)',
            boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #000',
            color: '#fff',
            checkbox: {
                background:
                    'linear-gradient(rgba(255, 255, 255, 0.07), transparent)',
                boxShadow:
                    'inset 0 0 0 2px rgba(0, 0, 0, 0.1), 0 0 1px 1px rgba(0, 0, 0, 0.5)'
            },
            checkboxDot: {
                background:
                    'linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9))'
            },
            lowPriority: {
                background: 'linear-gradient(#151515,#131313)'
            }
        },
        general: {
            blue: '#0d3e90',
            red: '#c62828'
        }
    }
};
