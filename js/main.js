var gui = require('nw.gui');
var win = gui.Window.get();

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
  }
});

onload = function() {
  states = new States();
};