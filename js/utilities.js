function writeToLCD(data) {
	$("#user-messages #textbox").text(data);
}

function writeVoltage(voltage) {
	$("#voltage").text("Volts: " + voltage);
}

function getCurrentMode() {
    return $('#mode_select').children('input:checked').val();
}

function updateModeDisplay(enabled) {
    var mode = getCurrentMode();
    var state = enabled ? 'Enabled' : 'Disabled';

    $('#mode').html('<p>' + mode + '</p><p>' + state + '</p>');
}