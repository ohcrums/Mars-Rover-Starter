const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  it("constructor sets command type", function() {
    let testCommandType = new Command('MOVE', 12000);
    expect(testCommandType.commandType).toBe('MOVE');
  })

  it("constructor sets a value passed in as the 2nd argument", function(){
    let testValue = new Command('MOVE', 12000);
    expect(testValue.value).toBe(12000);
  })
  
});