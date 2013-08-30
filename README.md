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
Coming soon

Note: The Linux packages may not work on Ubuntu 13.04+ due to issues with libudev.
Look at [The solution of lacking libudev.so.0(https://github.com/rogerwang/node-webkit/wiki/The-solution-of-lacking-libudev.so.0) for details on how to fix this.

## Compile from Source

Compiling from source can be found in the [node-webkit documentation](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps). 
You still have to run *npm install* in the cloned git repository before
packaging. Otherwise, DriverStation.js will be unresponsive because of
JavaScript crashing from dependency errors.

``` bash
$ npm install
```

## License

DriverStation.js is distributed under the [MPL 2.0](http://www.mozilla.org/MPL/2.0/).

## Changelog

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
