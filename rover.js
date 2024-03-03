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
     let responder = {
       message: message.name,
       results: []
     }
     while (message.commands.length > 0) {
 
         if ( message.commands[0].commandType == 'MOVE' ) {
           let moveObj = {
             message: 'MOVE',
             completed: true
           };
           responder.results.push(moveObj);
           message.commands.splice([0], 1)
 
         } else if ( message.commands[0].commandType == 'STATUS_CHECK' ) {
           let statObj = {
             command: 'STATUS_CHECK',
             completed: true,
             mode: this.mode,
             generatorWatts: this.generatorWatts,
             position: this.position
           };
           responder.results.push(statObj);
           message.commands.splice([0], 1)
 
         } else if ( message.commands[0].commandType == 'MODE_CHANGE' ) {
           this.mode = message.commands[0].value
           let modeObj = {
             message: 'MODE_CHANGE',
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