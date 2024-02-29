class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }

}

// commandType is a string that represents the type of command
// value is a value related to the type of command

module.exports = Command;