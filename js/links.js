var gui = require('nw.gui');

function hookLinks() {
  $("#178_homepage").click(function() {
    gui.Shell.openExternal("http://farmingtonrobotics.org/");
  });

  $("#dreamfirst").click(function() {
    gui.Shell.openExternal("http://dreamfirst.org/");
  });

  $("#contrib_gluxon").click(function() {
    gui.Shell.openExternal("https://twitter.com/@gluxon");
  });

  $("#contrib_innoying").click(function() {
    gui.Shell.openExternal("https://github.com/innoying");
  });
}