# DriverStation.js

An Open Source FRC Driver Station.

![DriverStation.js](http://i.imgur.com/Rz8iTj9.png)
![DriverStation.js](http://i.imgur.com/RFcOAJX.png)
![DriverStation.js](http://i.imgur.com/654fPmo.png)

## Downloads

v0.4.4

**Packages**  
Packages are avalible here: [http://gustavemichel.com/OSCPDSPackages/](http://gustavemichel.com/OSCPDSPackages/).  
- Windows  
- Mac  
- Linux32 (NLinux32 Contains Missing libudev.so.0 Fix)  
- Linux64 (NLinux64 Contains Missing libudev.so.0 Fix)  
- .NW Package (All Platforms, Requires you install Node-Webkit 0.8.6)  
  
## Compile from Source

Compiling from source can be found in the [node-webkit documentation](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps).
You still have to run *npm install* in the cloned git repository before
packaging. Otherwise, DriverStation.js will be unresponsive because of
JavaScript crashing from dependency errors.

``` bash
$ npm install
```

After installing the required dependencies, additional actions  will need to be taken to obtain a functional application.

### Compiling node-gamepad

Due to node-gamepad using native files and the use of node-webkit instead of node, the pre-installed native may not work, below is the process for compiling the native from the Application Directory.

``` bash
$ npm install -g node-gyp nw-gyp node-pre-gyp # May require Sudo
$ cd node_modules/gamepad/
$ node-pre-gyp build --runtime=node-webkit --target=0.8.6
```

The Additional Platform Specific dependencies for compiling node natives can be found on the [node-gyp](https://github.com/TooTallNate/node-gyp#installation) github repo README.  

#### Notes:
##### Linux
If your system's Python 2.7 executable isn't just called `python` you can use the `--python` switch.  

##### Windows
This process was rather difficult, below is a step by step of what I did to complete this task (in additon to the above general instructions).  
Note: I started with a clean install of Windows 7 Home Premium 64-bit.  

- Install [Python 2.7.3](http://www.python.org/download/releases/2.7.3#download)
- Install [Microsoft Visual Studio C++ 2010](http://go.microsoft.com/?linkid=9709949)
- Install [Windows 7 64-bit SDK](http://www.microsoft.com/en-us/download/details.aspx?id=8279)
- Install [compiler update for the Windows SDK 7.1](http://www.microsoft.com/en-us/download/details.aspx?id=4422)
- Install [Microsoft Visual Studio C++ 2012](http://go.microsoft.com/?linkid=9816758)
- Run Windows Update until Service Pack I installs (Windows 7 Only)
- Install: [Microsoft Visual Studio C++ 2013](http://go.microsoft.com/?linkid=9832280&clcid=0x409)
- Compile Using the --msvs_version=2013 flag. (the --target_arch=ia32 flag is also required if you are running a 64-bit system)


### Running Unpackaged

Run in the Application Directory.

``` bash
$ ./node_modules/nodewebkit/nodewebkit/nw ./
```

### Repairing Missing libudev.so.0

Since node-webkit is installed in node_modules, the sed commq and can be used fairly easily to correct this issue. I assume you are starting at the Application Directory.

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
