# DriverStation.js

An Open Source FRC Driver Station.

![DriverStation.js](http://i.imgur.com/2KVvVkO.png)
![Driverstation.js](http://i.imgur.com/G8l5MR5.png)

## Downloads

v0.2.2

**Windows**  
[DriverStation.js.app-Windows32.zip](github.com/gixxy/DriverStation.js)  [ MB download] 
MD5: 

**Linux**  
[DriverStation.js.app-Linux32.zip](github.com/gixxy/DriverStation.js)  [ MB download]  
MD5: 

[DriverStation.js.app-Linux64.zip](http://gustavemichel.com/OSCPDSPackages/DriverStation.js.app-Linux64.zip) [32.9 MB download]  
MD5: 505b2a63160ea3d5ab9dba2faf21d1c3

**Linux with Libudev.s0.1 Fix**  
[DriverStation.js.app-NLinux32.zip](github.com/gixxy/DriverStation.js)  [ MB download]
MD5: 

[DriverStation.js.app-NLinux64.zip](http://gustavemichel.com/OSCPDSPackages/DriverStation.js.app-NLinux64.zip) [32.9 MB download]
MD5: b197ad5f72b8a494029dad2f6e570fad

**OS X**  
[DriverStation.js.app-osxia32.zip](http://gustavemichel/OSCPDSPackages/DriverStation.js.app-osxia32.zip) [35.5 MB download]  
MD5: 36648e9784f921dc04d121ca244df6e8


Note: The Linux packages may not work on Ubuntu 13.04+ due to issues with libudev.
Look at [The solution of lacking libudev.so.0](https://github.com/rogerwang/node-webkit/wiki/The-solution-of-lacking-libudev.so.0) for details on how to fix this.

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
On Linux you must have Python 2.7 installed as well as GCC.
On Windows you must have the .Net Framework 2.0 SDK installed as well as Python 2.7.
On Mac you must have XCode and Command Line Tools installed

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
Project Copied by Gustave Michel III.
- Support for Joysticks Added
- Keybinds for F1-Enable, Enter-Disable, and Spacebar-EStop
- Joystick Setup section to re-order Joysticks
- Joystick Setup Identification LEDs. Light when any button is pressed.

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
