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

Coverage.prototype.run = function() {
  this._readStylesheets(this.stylesheetPath);
  this._readMarkup(this.markupPath);

  return true;
}

Coverage.prototype.getReport = function() {
  return this.report;
}

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
