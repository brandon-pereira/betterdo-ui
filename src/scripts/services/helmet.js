export const setThemeColor = color => {
    if (typeof document !== undefined) {
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute('content', color);
    }
};
