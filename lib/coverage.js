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

  return this.report;
}

Coverage.prototype._readStylesheets = function(path, extensions) {
  var validExtensions = ['css', 'scss', 'less'];
  var files           = find.fileSync(/\.(css|scss|less)$/, path);

  for(var i in files) {
    if (validExtensions.indexOf(this._getExtension(files[i])) > -1) {
      var fileContent = fs.readFileSync(files[i]).toString();
      var classes      = this._getClassesFromStylesheet(fileContent)

      for (item in classes) {
        this.report[classes[item]] = false;
      }
    }
  }
}

Coverage.prototype._getClassesFromStylesheet = function(stylesheetContent) {
  var classesRegex = /\.[-]?[_a-zA-Z][_a-zA-Z0-9-]*|[^\0-\177]*\\[0-9a-f]{1,6}(\r\n[ \n\r\t\f])?|\\[^\n\r\f0-9a-f]*/g;

  return stylesheetContent.match(classesRegex);
}

Coverage.prototype._getExtension = function(filename) {
  var extensionRe = /(?:\.([^.]+))?$/;
  return extensionRe.exec(filename)[1];
}

/**
 * Exports the constructor
 */
module.exports = Coverage;
