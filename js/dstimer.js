function DSTimer() {
  this.timer;
}

DSTimer.prototype.start = function() {
  //Will this cause problems without starting the timer first?
  this.stop(); //reset before starting in case of previous timer
  var self = this;

  this.startTime = new Date().getTime();

  this.timer = setInterval(function() {
    var elapsedTime = new Date().getTime() - self.startTime;
    self.write(self.formatTime(elapsedTime));
  }, 100);
};

DSTimer.prototype.stop = function() {
  $("#time").text("Elapsed Time: 0:00.0");
  clearInterval(this.timer);
};

DSTimer.prototype.write = function(time) {
  $("#time").text("Elapsed Time: " + time);
};

// I want a better way to do this. Issue #3
DSTimer.prototype.formatTime = function(time) {
  var time = new String(time);
  var time = time.substr(0, time.length - 2);

  var milliseconds = time.substr(-1, time.length);

  var time = time.substr(0, time.length -1)

  var minutes = new String( Math.floor(time / 60) );
  var seconds = new String( time - minutes * 60 );

  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds + "." + milliseconds;
};
