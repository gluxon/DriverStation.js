var driverstation = (require('..'));

var options = {
	teamID: 178
};

driverstation.start(options);

driverstation.on('connect', function() {
	console.log("connected!");
});

driverstation.on('disconnect', function() {
	console.log("disconnected");
});

driverstation.enable();