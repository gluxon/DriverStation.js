var gui = require('nw.gui');
var win = gui.Window.get();

var driverstation = require('driverstation');

var fs = require('fs');
require('js-yaml');

var SETTINGS_FILE = './config/settings.yaml';

// Check if settings file exists
fs.exists(SETTINGS_FILE, function(exists) {
  if (exists) {
    settings = require(SETTINGS_FILE);
    if (settings.debug) {
      win.showDevTools();
    }
  } else {
    alert("Settings file could not be loaded. Closing.");
    process.exit(0);
  }
});

onload = function() {
  states = new States();

  // Send the enable signal when "enable" is pressed
  states.event.on('enable', function() {
    driverstation.enable();
  });

  states.event.on('disable', function() {
    driverstation.disable();
  });

  driverstation.start({
    teamID: 178
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
};
