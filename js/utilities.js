function writeToLCD(data) {
	$("#user-messages #textbox").text(data);
};

function writeVoltage(voltage) {
	$("#voltage").text("Volts: " + voltage);
}