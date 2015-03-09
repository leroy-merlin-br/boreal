var chalk = require('chalk');

/**
 * Constructs Cli and run a command based in argv
 *
 * @param {array} argv Cli parameters
 */
function Cli(argv) {
  this.exitCode = 0;

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
    this[command].apply(this, commandParams)+'\n'
  );

  // Exit code
  process.exit(this.exitCode);
}

/**
 * Warns the user that the given command doesn't exist
 *
 * @return {string} Package version
 */
Cli.prototype._commandNotFound = function(command) {
  return chalk.red('Command \''+command+'\' not found.\n')+
    'Use \'help\' to see available commands';
}

/**
 * Exports the constructor
 */
module.exports = Cli;
