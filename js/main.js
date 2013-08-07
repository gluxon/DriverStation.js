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
    teamID: localStorage.teamID
  });

  // Turn on/off LEDs on events
  driverstation.connection.on('connect', function() {
    states.enableCommunicationsLED();
    states.enableTrigger();
  });

  driverstation.connection.on('disconnect', function() {
    states.disableCommunicationsLED();
    states.disableTrigger();
  });

  driverstation.connection.on('robotData', function(robotData) {
    writeToLCD(robotData.userDsLcdData);
  });
};
