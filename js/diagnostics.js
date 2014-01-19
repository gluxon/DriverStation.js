var util = require("util");
var events = require("events");

function Diagnostics() {
  events.EventEmitter.call(this);

  this.hookRebootButton();
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
