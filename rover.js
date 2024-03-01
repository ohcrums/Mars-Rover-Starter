class Rover {
   // Write code here!

   // position is a number representing current position
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL'
      let generatorWatts = 110;
   }
   // function handles updates to rover object properties, takes Message object as argument
   receiveMessage(message) {

      // returns an object containing two properties: `message`, the name from the original Message; and `results`, an array of results. each element is an object that corresponds to one command in message.commands
   }
}

module.exports = Rover;