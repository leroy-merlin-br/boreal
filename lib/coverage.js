var fs   = require('fs');
var find = require('find');

/**
 * Constructs a new Coverage instance
 *
 * @param  {string} stylesheetPath Stylesheet file name or directory containing stylesheet
 * @param  {string} markupPath     Markup file or directory containing markup (html, twig, php, etc)
 *
 * @return {string}            Coverage status
 */
function Coverage(stylesheetPath, markupPath) {
  this.stylesheetPath = stylesheetPath;
  this.markupPath     = markupPath;
  this.report         = {};
}

/**
 * Run the coverage and return true if everithing went well. The result of the
 * coverage will be stored in the 'report' property of the coverage object.
 *
 * @return {boolean} Success
 */
Coverage.prototype.run = function() {
  this._readStylesheets(this.stylesheetPath);
  this._readMarkup(this.markupPath);

  return true;
}

/**
 * After running the coverage. Use this method to retrieve the result of the
 * coverage. The result will be an object with classes as the properties and a
 * boolean telling if that class was used in the given markup or not,
 *
 * @example
 * // return will be like
 * {"btn-primary": true, "btn-secondary": true, "btn-not-used": false}
 *
 * @return {object} with classes as the properties and boolean telling if that class was present in the markup
 */
Coverage.prototype.getReport = function() {
  return this.report;
}

/**
 * Reads a stylesheet path and store all classes found as properties of the
 * 'report' attribute of the coverage object.
 *
 * @param  {string} path Path to a directory containing the stylesheets (may be .css, .scss or .less files)
 */
Coverage.prototype._readStylesheets = function(path) {
  var files           = find.fileSync(/\.(css|scss|less)$/, path);

  for(var i in files) {
    var fileContent = fs.readFileSync(files[i]).toString();
    var classes      = this._getClassesFromStylesheet(fileContent)


    for (i in classes) {
      var className = classes[i].replace(/(\.|'|")/gi, '');
      this.report[className] = false;
    }
  }
}

/**
 * Get an array of the classes that are defined in the given content.
 *
 * @param  {string} stylesheetContent The content of a stylesheet file
 *
 * @return {array}                    Array with the found classes (without the '.' in the name)
 */
Coverage.prototype._getClassesFromStylesheet = function(stylesheetContent) {
  /**
   * If you wish to understand or debug this regex, head to https://regex101.com/r/aZ7mT8/1
   * @type {RegExp}
   */
  var classesRegex = /[\s,](\.[-]?[_a-zA-Z][_a-zA-Z0-9-]*|[^\0-\177]*\\[0-9a-f]{1,6}(\r\n[ \n\r\t\f])?|\\[^\n\r\f0-9a-f]*)/g;
  var classes = [];
  var m;

  while ((m = classesRegex.exec(stylesheetContent)) != null) {
    if (m.index === classesRegex.lastIndex) {
        classesRegex.lastIndex++;
    }

    // Gather classes using m variable
    classes.push(m[1]);
  }

  return classes;
}

/**
 * Reads a markup path. It will traverse all markup files (html, php, erb or
 * twig) in the given path. It will flag as true the classes in the report
 * property of the coverage object
 *
 * @param  {string} path Path to a directory containing the markup
 */
Coverage.prototype._readMarkup = function(path) {
  var files           = find.fileSync(/\.(html|php|erb|twig)$/, path);

  for(var i in files) {
    var fileContent = fs.readFileSync(files[i]).toString();
    var classes      = this._getClassesFromMarkup(fileContent)

    for (i in classes) {
      if (this.report[classes[i]] != undefined) {
        this.report[classes[i]] = true;
      }
    }
  }
}


/**
 * Get classes that are being used in the given markup text. It will look for
 * "class=<className>" and return an array with the classes found.
 * @param  {string} markupContent HTML code
 * @return {array}                Array of class names
 */
Coverage.prototype._getClassesFromMarkup = function(markupContent) {
  var usedClassesRegex = /class\s*=\s*["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
  var matches = markupContent.match(usedClassesRegex);
  var results = [];

  for(var i in matches) {
    results = results.concat(
      matches[i].replace(/(class\s*=\s*|'|")/g, '')
        .split(' ')
    );
  }

  return results;
}

/**
 * Exports the constructor
 */
module.exports = Coverage;
