# DriverStation.js

An Open Source FRC Driver Station.

![DriverStation.js](http://i.imgur.com/vMrjbTg.png)

## Downloads

Downloadable installers will be available at the first beta release.

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