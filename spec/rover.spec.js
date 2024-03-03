const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // keeping sets of tests in different describes for clarity
  describe("basic checks", function() {

    it('constructor sets position and default values for mode and generatorWatts', function() {
      let testPosition = 1000
      let geoRover = new Rover(testPosition);
      expect(geoRover.position).toBe(testPosition);
      expect(geoRover.mode).toBe('NORMAL');
      expect(geoRover.generatorWatts).toBe(110)
    })

    it('response returned by receiveMessage contains the name of the message', function() {
      let statusCommands = [new Command('STATUS_CHECK')];
      let statusMessage = new Message ('check-yourself', statusCommands);
      let nameRover = new Rover(1000);
      let nameResponse = nameRover.receiveMessage(statusMessage);
      expect(nameResponse.message).toContain(statusMessage.name);
    })

    it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
      let multiCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let multiMessage = new Message ('messageName', multiCommands);
      let messRover = new Rover(1000);
      let messResponse = messRover.receiveMessage(multiMessage);
      expect(messResponse.results.length).toBe(2);
    })
  })

  describe("Command checks", function() {

    it('responds correctly to the status check command', function() {
      let statusCommands = [new Command('STATUS_CHECK')];
      let statusMessage = new Message ('check-yourself', statusCommands);
      let statusRover = new Rover(1000);
      let statusResponse = statusRover.receiveMessage(statusMessage);
      expect(statusResponse.results[0].completed).toBe(true);;
      expect(statusResponse.results[0].mode).toContain('NORMAL');
      expect(statusResponse.results[0].generatorWatts).toBe(110);
      expect(statusResponse.results[0].position).toBe(1000);
    })
    
    it('responds correctly to the mode change command', function() {
      let modeCommands = [new Command('MODE_CHANGE', 'LOW_POWER')];
      let modeMessage = new Message ('lose charge', modeCommands);
      let modeRover = new Rover(1000);
      let modeResponse = modeRover.receiveMessage(modeMessage);
      expect(modeResponse.results[0].completed).toBe(true)
      expect(modeRover.mode).toContain('LOW_POWER')
    })
    
    it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
      let stillCommands = [new Command('MODE_CHANGE', 'LOW_POWER') , new Command('MOVE', 2000)];
      let stillMessage = new Message ('stay still', stillCommands);
      let samePosition = 1000;
      let stillRover = new Rover(samePosition);
      let stillResponse = stillRover.receiveMessage(stillMessage);

      expect(stillResponse.results[1].completed).toBe(false);
      expect(stillRover.position).toBe(samePosition);
    })
    
    it('responds with the position for the move command', function() {
      let startPosition = 1000;
      let newPosition = 2000;
      let moveRover = new Rover(startPosition);
      let moveCommands = [new Command('MOVE', newPosition)];
      let moveMessage = new Message ('get moving', moveCommands);
      let moveResponse = moveRover.receiveMessage(moveMessage);

      expect(moveResponse.results[0].completed).toBe(true);
      expect(moveRover.position).toBe(newPosition); 
    })
    
  })


});
