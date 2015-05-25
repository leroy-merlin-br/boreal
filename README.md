# boreal

**_CSS Coverage for Pattern Libraries_**

[![License MIT](http://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

_boreal_ is a code coverage tool to be used in pattern libraries, styleguides, themes and any other "twitter bootstrap like" project.

[![Boreal Screenshot](https://dl.dropboxusercontent.com/u/12506137/libs_bundles/boreal_usage.png)](https://dl.dropboxusercontent.com/u/12506137/libs_bundles/boreal_usage.png)

_**The main idea behind boreal is to provide a sort of "automated testing" to stylesheets.** boreal works by analysing your set of stylesheets and a set of markup documentation that explains how to use your stylesheets. The exit will be "green" if everything in the stylesheets is demonstrated in the documentation, otherwise boreal will exit as "red", displaying which classes are missing in your docs._

With _boreal_ you can easily add your stylesheets into continuous integration. Using the documentation as "tests" against the stylesheets of the pattern library.

## Usage

Install _boreal_ (globally if you like)

```
$ npm install boreal -g
```

Then you can simply call the `coverage` command of _boreal_ pointing to te directory if your stylesheets and of your documentation markup: `coverage <stylesheet> <markup>`

```
$ boreal coverage path/to/stylesheets path/to/docs
```

The exit code will be 0 if all classes are being used in the documentation markup

Currently, _boreal_ supports css, scss and less stylesheets and html, php, erb and twig files for markup.
