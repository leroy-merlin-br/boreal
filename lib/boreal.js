var chalk = require('chalk');

/**
 * Constructs Boreal and run a command based in argv
 *
 * @param {array} argv Cli parameters
 */
function Boreal(argv) {
  this.exitCode = 0;
  this._printLogo();

  // Breaks argv in command and parameters
  var command       = argv[2] || 'help';
  var commandParams = argv.slice(3);

  // Check if command exists
  if (typeof this[command] === 'undefined') {
    console.log(this._commandNotFound(command));
    process.exit(1);
  }

  // Run command method with commandParams being the method parameters
  console.log(
    this[command].apply(this, commandParams)
  );

  // Exit code
  process.exit(this.exitCode);
}

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
 * Returns the version of the package
 *
 * @return {string} Package version
 */
Boreal.prototype._commandNotFound = function(command) {
  return chalk.red('Command \''+command+'\' not found.\n')+
    'Use \'boreal help\' to see available commands';
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
