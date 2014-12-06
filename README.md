# DriverStation.js

An Open Source FRC Driver Station.

![DriverStation.js](http://i.imgur.com/vMrjbTg.png)

## Downloads

v0.2.2

**Windows**  
[driverstation.js-0.2.2.win32.SFX.exe](http://ubuntuone.com/7Vt37YX2Hr8oyzJ6oydXgg) [15.1 MB download]  
MD5: 9490c51028b7aada9670a8a1c7cfa16c

**Linux**  
[driverstation.js-0.2.2-linux-ia32.tar.gz](http://ubuntuone.com/6c7cMCrfMJV4fn4lnYoRBu)  [29.0 MB download]  
MD5: ea1e8de1cd807a50c5c189e9b449f18a

[driverstation.js-0.2.2-linux-x86_64.tar.gz](http://ubuntuone.com/3tjxxS7Q2Cnq4qga7vhdbD) [31.8 MB download]  
MD5: d6ee99a693249b8b6ed1c52bcd646c89

**OS X**  
[DriverStation.js-v0.3-osx-ia32.zip](http://ubuntuone.com/0NkvZ5bMdZVVzeMZTqeepv) [28.4 MB download]  
MD5: f459cd11696fe0041eed17c15194be2f

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
$ cd node_modules/gamepad/
$ ./node_modules/node-pre-gyp/bin/node-pre-gyp build --runtime=node-webkit --target=0.8.6
```

In the case of my system, I also needed the --python switch to specifiy my python2.7 executable

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
