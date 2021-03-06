## README IN PROGRESS

### Gulp
See [gulp-readme.md](./tools/gulp/gulp-readme.md) for setup.

The entry `gulpfile.js` is located in `tools/gulp` and all gulp commands need to be run from this directory. There is also a proxy `gulpfile.js` at the project root, which can run all the same commands.

Available commands are
 * `gulp` or `gulp dev`- will run dev build with watchers
 * `gulp build` - will run dev _without_ watchers.
 * `gulp prod` - will run production build without watchers
 * `gulp [task]` - where task is loaded in `gulpfile.js`.  eg. `css`, `svg-sprite`

The watcher will also start a [browserSync](https://browsersync.io/) server.  The console will tell you the exact port, but it usually runs on [http://localhost:3000/](http://localhost:3000/).  

### CSS
All css source files are located in `/assets/scss/`.  Gulp will compile all scss files in this directory and concat them into a single file `/assets/build/css/index-generated.css`.

[BEM](https://css-tricks.com/bem-101/) methodology is loosely used for class naming. In general, every new Block element should get a new file in `/assets/scss/`.

For more information, refer to [http://wiki.velir.com/index.php?title=Semantics_Using_BEM/SMACSS](http://wiki.velir.com/index.php?title=Semantics_Using_BEM/SMACSS)


#### TODO
RE-ORG SCSS STRUCTURE

### Javascript
There are 3 types of Javascript files that are generated via the gulp build.

#### 1. Application scripts
All javascript source files are located in `/assets/js-source/`.

All generated files will be compiled into `/assets/build/js` and have `-generated` appended to the end of the filename.

eg. `/assets/js-source/index.js` > `/assets/build/js/index-generated.js`

By default, `index.js` is the only entry file. Multiple entry files can be specified in `/tools/gulp/tasks/js.js`.

ES6 modules are used to import other files into these entry point files. eg:

`import React from "react";`  
`import $ from "jquery";`
`import DataProfile from "../components/DataProfile/DataProfile.jsx";`



#### 2. 3rd party scripts
## TODO
come up with a synonym to "common" and "vendor".
some options are:
`packages-generated.js`
`libraries-generated.js`
`dependencies-generated.js`
`third-party-generated.js`
`not-our-generated.js`
`external-generated.js`

/TODO

Generated into `/assets/build/js/common-generated.js`

3rd party Javascript dependancies are included via gulp and `package.json` in the root of the project.  To add a new javascript dependency, from the project root, run eg. `npm install --save react`.  Then, in your application script file, use eg. `import React from "react";` to include the dependency by the package name.

#### 3. Polyfill scripts
Generated into `/assets/build/js/polyfill-generated.js`

We're using bower to manage 3rd party polyfill scripts that need to be global on the page. Bower is located in `/assets/polyfill/`.  To add additional polyfills, make sure bower is [globally installed](http://bower.io/#install-bower) and run eg:

`bower install --save fetch`

The fetch polyfill will now be included in `polyfill-generated.js`.  If you need to include different files from what is defined in bower.json for the fetch package, see [main-bower-files overrides](https://www.npmjs.com/package/main-bower-files#overrides-options).


## PICK UP HERE
### Images
All image assets are located in `/assets/img/` and can be accessed in the code via the url `/assets/img/`.

### SVG sprite
An svg sprite is generated with all the svgs located in `/assets/img/svg-sprite/`. Using `<use>` is fairly limited, so only use the svg-sprite if it fits your needs. Otherwise, just put the svg's in `assets/img/`.

To use the svg-sprite, put the svg's in this directory.  eg. `assets/img/svg-sprite/my-icon.svg`. All these files will be compiled into `assets/img/svg-sprite.svg`.

In html: `<svg><use xlink:href="/img/svg-sprite.svg#my-icon"></use></svg>`

In css: `svg { fill: BlanchedAlmond; }`
