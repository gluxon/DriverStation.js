function Setup() {
  this.hookTeamID();
}

Setup.prototype.hookTeamID = function() {
  $('#setup_teamID').keypress(function(e) {
	if (e.charCode < 48 | e.charCode > 57) {
		// We only want numbers
		e.preventDefault();
	}
  });
};