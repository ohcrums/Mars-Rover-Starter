class Rover {
  // Write code here!

  // position is a number representing current position, required for construction
  constructor(position) {
     this.position = position;
     if (!position) {
        throw Error("Position required.");
     }
     // default values
     this.mode = 'NORMAL'
     this.generatorWatts = 110;
  }
  // function handles updates to rover object properties, takes Message object as argument
  receiveMessage(message) {
   let results = {
      message: message.name,
      results: []
   }
   console.log(message.name)
   while (message.commands.length > 0) {
      if ( message.commands[0].commandType == 'MOVE' ) {
          let moveObj = {
            message: 'MOVE',
            completed: true
          };
          results.results.push(moveObj);
          message.commands.splice([0], 1)
        } else if ( message.commands[0].commandType == 'STATUS_CHECK' ) {
          let statObj = {
            command: 'STATUS_CHECK',
            completed: true,
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          };
          results.results.push(statObj);
          message.commands.splice([0], 1)
         
         } else if ( message.commands[0].commandType == 'MODE_CHANGE' ) {
          let modeObj = {
            message: 'MODE_CHANGE',
            completed: true
          };
          results.results.push(modeObj);
          message.commands.splice([0], 1)
         }
        console.log(message.commands.length)
     
      }
     
    return results;
   }
}

module.exports = Rover;