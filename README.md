# Flash

Flash allows you to quickly and easily build robust web applications with virtually any tech stack. It takes care of the heavy lifting (see features below), and provides you with a good solid shell for your application.

## Features

- Modern Stack
- Define required javascript/css dependencies, show a loader till those dependencies are loaded, and then provides an easy API for accessing those dependencies. (see preloader section)
- HTML Rendering with [Nunjucks](https://mozilla.github.io/nunjucks/)
- Critical CSS / JS with `inline` attribute
- SVG Spritesheet generation

## Styles

Flash works on the principle of two types of stylesheets. Critical stylesheets (which get included on render), and 'passive stylesheets', which get included async.

- **Critical Styling:** Anything critical should be added to `./src/styles/critical.scss`. **These are added to the HTML head directly and will impact initial render**. Avoid using this file!
- **Add-on Styling:** Anything that's add-on should be added to `./src/styles/app.scss`. These are styles which are loaded async after the page is done loading.
- **Component Styling:** In your Javascript, when creating a new component you can import a scss file to include the stylesheet.

The benefit to the three files is page load. That's the main goal of Flash.

## Pre-loader

Flash has a built in pre-loader. This is what is shown after the dom is rendered, but before the required styles and javascript have been loaded.

You can define required dependencies like so:

```js
// index.js
dependencies.set('dependency1', import('./dependency1'));
dependencies.set('dependency2', import('./dependency2'));

// app.js
export default (dependencies) => {
    const dependency1 = dependencies.get('dependency1')
    dependency1.setRenderer(document.body);
}
```

Once your dependencies are loaded, app.js will be called and the preloader will go away.

Using a pre-loader can improve the perceived load time drastically.

## HTML Rendering

TODO

## Setting up

```bash
mkdir myapp
cd myapp
git init
git remote add origin git@github.com:brandon-pereira/flash.git
git pull origin master
git remote remove origin
```

## TODO

- Generate app manifest
- Documentation