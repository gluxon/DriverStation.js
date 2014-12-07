var gui = require('nw.gui');
var win = gui.Window.get();

var driverstation = require('frc-driverstation');
var gamepad = require('gamepad');

var fs = require('fs');

var joystickIDs = [ //For allocating the Joystick IDs to the 4 used Joysticks
    null,
    null,
    null,
    null,
  ];

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

  /***************************Gamepad Code********************************/
  // var joystickIDs = [ //For allocating the Joystick IDs to the 4 used Joysticks
  //   null,
  //   null,
  //   null,
  //   null,
  // ];

  var numAxis = 6;
  var numButton = 12;

  // Poll for Joystick events
  var joystick_update = setInterval(gamepad.processEvents, 16);
  // Scan for new Joysticks as a slower rate
  var joystick_detect = setInterval(gamepad.detectDevices, 500);

  // Listen for move events on all gamepads
  gamepad.on("move", function (id, axis, value) {
    if((joystickIDs.indexOf(id) > -1)&&(axis < numAxis)) {
      driverstation.FRCCommonControlData.joystickAxes[joystickIDs.indexOf(id)][axis] = Math.round(map(value, -1, 1, -128, 127));
    }
  });

  // Listen for button down events on all gamepads
  gamepad.on("down", function (id, num) {
    if((joystickIDs.indexOf(id) > -1)&&(num < numButton)) {
      driverstation.FRCCommonControlData.joystickButtons[joystickIDs.indexOf(id)] ^= (0x1 << num);
      setup.enableJoystickLED(joystickIDs.indexOf(id));
    }
  });

  // Listen for button up events on all gamepads
  gamepad.on("up", function (id, num) {
    if((joystickIDs.indexOf(id) > -1)&&(num < numButton)) {
      driverstation.FRCCommonControlData.joystickButtons[joystickIDs.indexOf(id)] ^= (0x1 << num);
      if(driverstation.FRCCommonControlData.joystickButtons[joystickIDs.indexOf(id)] == 0) {
        setup.disableJoystickLED(joystickIDs.indexOf(id));
      }
    }
  });

  gamepad.on("attach", function (id, state) {
    for(var i = 0; i < 4; i++) {
      if(joystickIDs[i] == null) {
        joystickIDs[i] = id;
        for(var i = 0; i < state.axisStates.length && i < numAxis; i++) { //set initial joystick values
          driverstation.FRCCommonControlData.joystickAxes[joystickIDs.indexOf(id)][i] = state.axisStates[i];
        }
        for(var i = 0; i < state.buttonStates.length && i < numButton; i++) { //set initial button values
          if(state.buttonStates[i] == true) {
            driverstation.FRCCommonControlData.joystickButtons[joystickIDs.indexOf(id)] ^= (0x1 << i);
            setup.enableJoystickLED(i);
          }
        }
        states.enableJoysticksLED(); //at least one joystick attached!
        updateSelectMenus();
        break; //allocation space found!
      }
    }
    updateSelectMenus();
  });

  gamepad.on("remove", function (id) {
    console.log("remove: "+id);
    if(joystickIDs.indexOf(id) > -1) {
      //Reset all States
      for(var i = 0; i < numAxis; i++) {
        driverstation.FRCCommonControlData.joystickAxes[joystickIDs.indexOf(id)][i] = 0;
      }
      driverstation.FRCCommonControlData.joystickButtons[joystickIDs.indexOf(id)] = 0;
      //Unallocate Joystick
      joystickIDs[joystickIDs.indexOf(id)] = null;
      var joysticksLeft = false;
      for(var i = 0; i < joystickIDs.length; i++) {
        if(joystickIDs[i] != null) {
          joysticksLeft = true;
          break;
        }
      }
      if(!joysticksLeft) {
        states.disableJoysticksLED();
      } else {
        states.enableJoysticksLED();
      }
    }
    updateSelectMenus();
  });
  gamepad.init(); //at end so initial attach listeners are run
  //map one range to another
  function map(self, from_min, from_max, to_min, to_max) {
    return ((to_max - to_min) * (self - from_min)) / (from_max - from_min) + to_min;
  }
  //Update the list of joysticks and how they are allocated
  function updateSelectMenus() {
    var data = [];
    for(var i = 0; i < gamepad.numDevices(); i++) {
      data[i] = {
        deviceID:gamepad.deviceAtIndex(i).deviceID,
        joystickID:((joystickIDs.indexOf(gamepad.deviceAtIndex(i).deviceID) != -1)? joystickIDs.indexOf(gamepad.deviceAtIndex(i).deviceID) : null),
        description:gamepad.deviceAtIndex(i).description,

      };
    }
    setup.generateSelectMenus(data);
  }

  //Event for Changing Joystick Allocation
  setup.on('joystick_change', function(joystickID, DeviceID) {
    //clearInterval(joystick_update);

    if(DeviceID != null && joystickIDs.indexOf(DeviceID) != -1) { //Handle Duplicates
      setup.disableJoystickLED(joystickIDs.indexOf(DeviceID));
      for(var i = 0; i < numAxis; i++) {
        driverstation.FRCCommonControlData.joystickAxes[joystickIDs.indexOf(DeviceID)][i] = 0;
      }
      driverstation.FRCCommonControlData.joystickButtons[joystickIDs.indexOf(DeviceID)] = 0;
      joystickIDs[joystickIDs.indexOf(DeviceID)] = null;
    }
    //attach
    joystickIDs[joystickID] = DeviceID;

    //reset
    setup.disableJoystickLED(joystickID);
    for(var i = 0; i < numAxis; i++) {
      driverstation.FRCCommonControlData.joystickAxes[joystickID][i] = 0;
    }
    driverstation.FRCCommonControlData.joystickButtons[joystickID] = 0;

    //set
    if(DeviceID != null) {
      var state = null;
      for(var i = 0; i < gamepad.numDevices(); i++) {
        if(gamepad.deviceAtIndex(i).deviceID == DeviceID) {
          state = gamepad.deviceAtIndex(i);
          break;
        }
      }
      for(var i = 0; i < state.axisStates.length && i < numAxis; i++) { //set initial joystick values
        driverstation.FRCCommonControlData.joystickAxes[joystickIDs.indexOf(DeviceID)][i] = state.axisStates[i];
      }
      for(var i = 0; i < state.buttonStates.length && i < numButton; i++) { //set initial button values
        if(state.buttonStates[i] == true) {
          driverstation.FRCCommonControlData.joystickButtons[joystickIDs.indexOf(DeviceID)] ^= (0x1 << i);
          setup.enableJoystickLED(joystickIDs.indexOf(DeviceID));
        }
      }
    }
    var joysticks_left = false;
    for(var i = 0; i < joystickIDs.length; i++) {
      if(joystickIDs[i] != null) {
        joysticks_left = true;
        break;
      }
    }
    if(!joysticks_left) {
      states.disableJoysticksLED();
    } else {
      states.enableJoysticksLED();
    }
    updateSelectMenus();


    //joystick_update = setInterval(gamepad.processEvents, 16);
  });
  updateSelectMenus();
  /*************************End Gamepad Code******************************/
  /***********************************************************************/
  Mousetrap.bind('f1', function(e) {
    if(states.ready) { //Will Switch Modes only if Robot is connected
      states.setEnabled();
    }
  });
  Mousetrap.bind('enter', function(e) {
    if(states.ready) { //Will Switch Modes only if Robot is connected
      states.setDisabled();
    }
  });
  Mousetrap.bind('space', function(e) {
    states.setEStop();
  });
  /***********************************************************************/
  
  // Send the enable signal when "enable" is pressed
  states.event.on('enable', function() {
    var mode = getCurrentMode();

    if (mode == 'Practice') {
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

  states.event.on('estop', function() {
    driverstation.estop();
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
    if (robotData['robotCode'] != robotCode) {
      if (robotData['robotCode']) {
        states.enableRobotCodeLED();
        states.enableTrigger();
      } else {
        states.disableRobotCodeLED();
        states.disableTrigger();
      }
      robotCode = robotData['robotCode'];
    }

    // If we don't have a value for the amount of free memory, assume that
    // robot code is loaded and guess that the amount of free memory without a
    // program would be 10 higher. This is likely to be error prone.
    if (!freeMemory) {
      freeMemory = robotData['freeMemory'];
      if (hasCode) {
        freeMemory += 10;
      }
      window.localStorage.freeMemory = freeMemory;
      driverstation.setFreeMemory(freeMemory);
    }

    writeToLCD(robotData.userDsLcdData);
    if (robotData.batteryVolts != '00.00') {
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