export const setCurrentRoute = url => {
    if (window && window.history) {
        history.replaceState({}, document.title, `#/${url}`);
    }
};
export const getCurrentRoute = () => {
    if (window && window.location) {
        return window.location.hash.replace('/', '').replace('#', '');
    }
    return '';
};

export default {
    getCurrentRoute,
    setCurrentRoute
};
