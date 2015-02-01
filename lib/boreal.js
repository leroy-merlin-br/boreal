var util  = require('util');
var chalk = require('chalk');
var Cli   = require('./cli');

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
 * Returns the version of the package
 * @return {string} Package version
 */
Boreal.prototype.version = function() {
  return '0.0.1';
}

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
  };

  for(var command in commandList){
    output = output+
      '  '+chalk.green(command)+' '+commandList[command]+'\n';
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
