var gui = require('nw.gui');
var win = gui.Window.get();

function hookDebug() {
  $("#debug").click(function() {
    win.showDevTools();
  });
}