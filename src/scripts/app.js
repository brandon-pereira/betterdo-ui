console.log("Initialized");
console.log("This is ES6:", "hellow".includes("ell"));

import('./animate').then((module) => module());
// import '../styles/app.scss'
//
require('./lib/loadCss')('./styles/app.css');