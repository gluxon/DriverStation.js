var util = require("util");
var events = require("events");

function Diagnostics() {
  events.EventEmitter.call(this);

  this.hookRebootButton();
  this.hookRobotCodeReset();
}

util.inherits(Diagnostics, events.EventEmitter);

/**
 * Listen for reboot button
 */
Diagnostics.prototype.hookRebootButton = function() {
  self = this;
  $('#reboot').click(function() {
    self.emit('reboot');
  });
};

/**
 * Listen for Robot Code reset
 */
Diagnostics.prototype.hookRobotCodeReset = function() {
  self = this;
  $('#diagnostics form').submit(function(evt) {
    evt.preventDefault(); //revents page refresh/reload
    var val = $(this).find('input[type=radio]:checked').val();
    if (!val) {
      return;
    }
    val = (val == 'full');
    console.log("getting to it");
    $(this).find('input[type=radio]:checked').removeAttr('checked');
    self.emit('resetRobotCode', val);
  });
};
