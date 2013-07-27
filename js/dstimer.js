function DSTimer() {
}

DSTimer.prototype.start = function() {
	var self = this;

	this.startTime = new Date().getTime();

	this.timer = setInterval(function() {
		var elapsedTime = new Date().getTime() - self.startTime;
		//writeToLCD(elapsedTime);
		self.writeElapsedTime(elapsedTime / 1000);
	}, 1);
};

DSTimer.prototype.stop = function() {
	$("#time").text("Elapsed Time: 0:00.0");
	clearInterval(this.timer);
};

DSTimer.prototype.writeElapsedTime = function(time) {
	$("#time").text("Elapsed Time: " + time);
};