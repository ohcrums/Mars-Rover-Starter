const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let testPosition = 1000
  let testRover = new Rover(testPosition);
 
  // keeping sets of tests in different scopes

  describe("basic object checks", function() {
    // an array of two commands from Command class, used to create a Message, then sent as an argument in the call to recceiveMessage
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message ('messageName', commands);
    let response = testRover.receiveMessage(message);

    it('constructor sets position and default values for mode and generatorWatts', function() {
      expect(testRover.position).toBe(testPosition);
      expect(testRover.mode).toBe('NORMAL');
      expect(testRover.generatorWatts).toBe(110)
    })

    it('response returned by receiveMessage contains the name of the message', function() {
      expect(response.message).toContain(message.name);
    })

    it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
      expect(response.results.length).toBe(2);
    })
  })

  describe("Command checks", function() {

    it('responds correctly to the status check command', function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message ('check-yourself', commands);
    let response = testRover.receiveMessage(message)

    expect(response.completed).toBe(true);
    expect(response.roverStatus.mode).toContain('NORMAL')
    expect(response.roverStatus.generatorWatts).toBe(110)
    expect(response.roverStatus.position).toContain(1234)
    })
    
    // it('responds correctly to the mode change command', function() {
  
    // })
    
    // it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
  
    // })
    
    // it('responds with the position for the move command', function() {
  
    // })
    
  })


});
