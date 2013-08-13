var gui = require('nw.gui');
var win = gui.Window.get();

var driverstation = require('driverstation');

var fs = require('fs');

onload = function() {
  states = new States();
  dstimer = new DSTimer();
  setup = new Setup();
  hookLinks();
  hookDebug();

  // Send the enable signal when "enable" is pressed
  states.event.on('enable', function() {
    driverstation.enable();
    dstimer.start();
  });

  states.event.on('disable', function() {
    driverstation.disable();
    dstimer.stop();
  });

  driverstation.start({
    teamID: Number(localStorage.teamID) // not sure why this is being reset to a string
  });

  // Turn on/off LEDs on events
  driverstation.on('connect', function() {
    states.enableCommunicationsLED();
    states.enableTrigger();
  });

  driverstation.on('disconnect', function() {
    states.disableCommunicationsLED();
    states.disableTrigger();
  });

  driverstation.on('robotData', function(robotData) {
    writeToLCD(robotData.userDsLcdData);
  });

  setup.on('teamID_change', function(teamID) {
    driverstation.setTeamID(teamID, function(err) {
      if (err) console.log(err);
    });
  });
};
