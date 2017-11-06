# Flash #

Coming Soon

## Features
- Modern Stack
- HTML Rendering with [Nunjucks](https://mozilla.github.io/nunjucks/)
- Critical CSS / JS with `inline` attribute

# Styles
Flash works on the principle of two types of stylesheets. Critical stylesheets (which get included on render), and 'passive stylesheets', which get included async.

- **Critical Styling:** Anything critical should be added to `./src/styles/critical.scss`. **These are added to the HTML head directly and will impact initial render**. Avoid using this file!
- **Add-on Styling:** Anything that's add-on should be added to `./src/styles/app.scss`. These are styles which are loaded async after the page is done loading. 
- **Component Styling:** In your Javascript, when creating a new component you can import a scss file to include the stylesheet.

The benefit to the three files is page load. That's the main goal of Flash.

# Pre-loader
Flash has a built in pre-loader. This is what is shown after the dom is rendered, but before the required styles and javascript have been loaded. 

Using a pre-loader can improve the perceived load time drastically.

# TODO
- Generate app manifest
- Documentation