const setCurrentRoute = url => {
    if (window && window.history) {
        history.replaceState({}, document.title, `#/${url}`);
    }
};
const getCurrentRoute = () => {
    if (window && window.location) {
        return window.location.hash.replace('/', '').replace('#', '');
    }
    return '';
};

export default {
    getCurrentRoute,
    setCurrentRoute
};
