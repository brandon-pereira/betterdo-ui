import WebFont from 'webfontloader';

export default () => {
    WebFont.load({
        google: {
            families: ['Noto Sans:300,400']
        }
    });
};
