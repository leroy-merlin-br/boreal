var util     = require('util');
var chalk    = require('chalk');
var Cli      = require('./cli');
var Coverage = require('./coverage');

/**
 * Constructs Boreal and run a command based in argv
 *
 * @param {array} argv Cli parameters
 */
function Boreal(argv) {
  this._printLogo();
  return Boreal.super_.call(this, argv);
}
util.inherits(Boreal, Cli);

/**
 * Returns the help information of the package
 *
 * @return {string} Help information
 */
Boreal.prototype.help = function() {
  var output      = "Available commands:\n";
  var commandList = {
    'help': 'Displays this help message',
    'version': 'Displays the package version',
    'coverage <stylesheet> <markup>': 'Will output the stylesheet coverage for the given files.'
  };

  for(var command in commandList){
    output = output+
      '  '+chalk.green(command)+' '+commandList[command]+'\n';
  }

  return output;
}

/**
 * Returns the version of the package
 * @return {string} Package version
 */
Boreal.prototype.version = function() {
  return '0.0.1';
}

/**
 * Output the stylesheet coverage for the given files. Also changes the exit
 * code to 1 if coverage is not 100%.
 *
 * @param  {string} stylesheet Stylesheet file name or directory containing stylesheet
 * @param  {string} markup     Markup file or directory containing markup (html, twig, php, etc)
 *
 * @return {string}            Coverage status
 */
Boreal.prototype.coverage = function(stylesheet, markup) {
  var coverage = new Coverage(stylesheet, markup);
  var output   = '';

  coverage.run();
  var report = coverage.getReport();

  for(var i in report){
    if (report[i]) {
      output = output+'.'+i+
        chalk.dim('[')+chalk.green('√')+chalk.dim('] ');
    } else {
      output = output+'.'+chalk.red(i)+
        chalk.dim('[')+chalk.red('x')+chalk.dim('] ');
    }
  }

  return output;
}

/**
 * Prints the title and version of boreal
 */
Boreal.prototype._printLogo = function() {
  console.log("\n"+chalk.magenta('boreal')+' '+this.version());
  console.log(chalk.dim('CSS Coverage for Pattern Libraries\n'));
}

/**
 * Exports the constructor
 */
module.exports = Boreal;
