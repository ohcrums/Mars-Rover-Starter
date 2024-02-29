class Message {
   // Write code here!
   // builds an object with two properties
   constructor(name, commands){
      // name is a string that is the name of the message
      // commands is an array of Command objects
      this.name = name;
      if (!name) {
         throw Error("Name required.");
      }
      this.commands = commands;
   }
}


module.exports = Message;