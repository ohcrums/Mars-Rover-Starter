class Rover {
 
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
      // declare output variable and initialize basic structure
      let responder = {
         message: message.name,
         results: []
      }

      // I handled multiple commands by splicing whatever command has been completed
      // break from while loop when there are none left
      while (message.commands.length > 0) {
         // series of if.else statements to catch command
         if ( message.commands[0].commandType == 'MOVE' ) {
            // create an object for the command 
            let moveObj = {};
            
            if (this.mode === 'LOW_POWER') {
               moveObj.completed = false;
            } else if (this.mode === 'NORMAL') {
               moveObj.completed = true;
               // position updated to command value
               this.position = message.commands[0].value;
            }
            // push command object into results array, and splice away the command
            responder.results.push(moveObj);
            message.commands.splice([0], 1)
 
         } else if ( message.commands[0].commandType == 'STATUS_CHECK' ) {
            let statObj = {
               completed: true,
            };

            // adding in this way so that it's properly nested to pass tests
            statObj.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            }
            responder.results.push(statObj);
            message.commands.splice([0], 1)

         } else if ( message.commands[0].commandType == 'MODE_CHANGE' ) {
            // mode updated to command value
            this.mode = message.commands[0].value
            let modeObj = {
               completed: true
            };
            responder.results.push(modeObj);
            message.commands.splice([0], 1)
         }
      }
      return responder;
   }
}

module.exports = Rover;