var gui = require('nw.gui');
var win = gui.Window.get();

var driverstation = require('driverstation');

var fs = require('fs');

onload = function() {
  states = new States();
  dstimer = new DSTimer();
  setup = new Setup();
  diagnostics = new Diagnostics();
  hookLinks();
  hookDebug();

  var robotCode = false;

  var practiceAutonomousTime = 10;
  var practiceTeleopTime = 140;
  var practiceTimeout = null;

  var freeMemory = Number(localStorage.freeMemory);
  var hasCode = true;
  driverstation.setFreeMemory(freeMemory);

  // Send the enable signal when "enable" is pressed
  states.event.on('enable', function() {
    var mode = getCurrentMode();

    if (mode == 'Practice')
    {
      mode = 'Autonomous';
      practiceTimeout = setTimeout(function() {
        driverstation.enable('Teleoperated');

        practiceTimeout = setTimeout(function() {
          driverstation.disable();
          dstimer.stop();
        }, practiceTeleopTime * 1000);
      }, practiceAutonomousTime * 1000);
    }
    driverstation.enable(mode);

    dstimer.start();
    updateModeDisplay(true);
  });

  states.event.on('disable', function() {
    driverstation.disable();
    dstimer.stop();
    clearTimeout(practiceTimeout);
    updateModeDisplay(false);
  });

  driverstation.start({
    teamID: Number(localStorage.teamID) // not sure why this is being reset to a string
  });

  // Turn on/off LEDs on events
  driverstation.on('connect', function() {
    states.enableCommunicationsLED();
  });

  driverstation.on('disconnect', function() {
    states.disableCommunicationsLED();
    states.disableRobotCodeLED();
    states.disableTrigger();
    clearTimeout(practiceTimeout);
  });

  driverstation.on('robotData', function(robotData) {
    if (robotData['robotCode'] != robotCode)
    {
      if (robotData['robotCode'])
      {
        states.enableRobotCodeLED();
        states.enableTrigger();
      }
      else
      {
        states.disableRobotCodeLED();
        states.disableTrigger();
      }

      robotCode = robotData['robotCode'];
    }

    // If we don't have a value for the amount of free memory, assume that
    // robot code is loaded and guess the amount of free memory without a
    // program would be 10 higher. This is likely to be error prone.
    if ( ! freeMemory)
    {
      freeMemory = robotData['freeMemory'];
      if (hasCode)
      {
        freeMemory += 10;
      }
      window.localStorage.freeMemory = freeMemory;
      driverstation.setFreeMemory(freeMemory);
    }

    writeToLCD(robotData.userDsLcdData);
    if (robotData.batteryVolts != '00.00')
    {
      writeVoltage(robotData.batteryVolts);
    }
  });

  setup.on('teamID_change', function(teamID) {
    driverstation.setTeamID(teamID, function(err) {
      if (err) console.error(err);
    });
  });

  diagnostics.on('reboot', function() {
    driverstation.reboot();
  });

  diagnostics.on('resetRobotCode', function(currentlyHasCode) {
    freeMemory = null;
    hasCode = currentlyHasCode;
  });
};
