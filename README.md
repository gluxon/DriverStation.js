# DriverStation.js

An Open Source FRC Driver Station.

![DriverStation.js](http://i.imgur.com/2KVvVkO.png)
![Driverstation.js](http://i.imgur.com/G8l5MR5.png)

## Downloads

v0.4.4

**Packages**  
Packages are avalible here: [http://gustavemichel.com/OSCPDSPackages/](http://gustavemichel.com/OSCPDSPackages/).  
Package Platforms Avalible:  
Windows  
Mac  
Linux32 (NLinux32 Contains Missing libudev.so.0 Fix)  
Linux64 (NLinux64 Contains Missing libudev.so.0 Fix)  
.NW Package (All Platforms, Requires you install Node-Webkit 0.8.6)  
  
## Compile from Source

Compiling from source can be found in the [node-webkit documentation](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps).
You still have to run *npm install* in the cloned git repository before
packaging. Otherwise, DriverStation.js will be unresponsive because of
JavaScript crashing from dependency errors.

``` bash
$ npm install
```

After installing the required dependencies, it is likely manual work will need to be done to insure a functional application.

### Compiling node-gamepad

Due to node-gamepad using native files and the use of node-webkit instead of node, the pre-installed native may not work, below is the process for compiling the native from the Application Directory.

``` bash
$ npm install -g node-gyp # May require Sudo
$ npm install -g nw-gyp # May require Sudo
$ cd node_modules/gamepad/
$ ./node_modules/node-pre-gyp/bin/node-pre-gyp build --runtime=node-webkit --target=0.8.6
```
Additional Platform Specific dependencies can be found on the [node-gyp]() github repo README.

In the case of my system, I needed the --python switch to specifiy my python2.7 executable

### Running Unpackaged

Run in the Application Directory.

``` bash
$ ./node_modules/nodewebkit/nodewebkit/nw ./
```

### Repairing Missing libudev.so.0

Since node-webkit is installed in node_modules, the sed command can be used fairly easily to correct this issue. I assume you are starting at the Application Directory.

``` bash
$ cd node_modules/nodewebkit/nodewebkit/
$ sed -i 's/udev\.so\.0/udev.so.1/g' nw
```

## License

DriverStation.js is distributed under the [MPL 2.0](http://www.mozilla.org/MPL/2.0/).

## Changelog

### 0.4
These changes are from [Gustave Michel III](https://www.github.com/gixxy).
- Support for Joysticks Added
- Keybinds for F1-Enable, Enter-Disable, and Spacebar-EStop
- Joystick Setup section to re-order Joysticks
- Joystick Identification LEDs. Light when any button is pressed.
- Currently Non-function Toggle for DriverStation Network Protocol

### 0.3
These changes are from FRC 2539, the Krypton Cougars. Many thanks to them!
- Add reboot cRIO button
- Robot Code detection and control to reset detection

### 0.2
- Working enable/disable of robot
- Display of voltage, userLcdData, and timer
- Gray out trigger when not connected to robot
- New about tab to credit contributors
- Debugging mode added to the about tab
- Link hooking to open hyperlinks in system browser
- Team Number input added to setup tab.
- HTML5 Web Storage now used to contain settings

### 0.1
- Initial Release
