$(window).load(function(){

var enabled = false;
var currentTab = "operation";

$("#trigger").click(function() {
	if (!enabled) {
		$("#trigger").attr("enabled", "true");
		$("#trigger").text("Disable");
		enabled = true;
	} else {
		$("#trigger").removeAttr("enabled");
		$("#trigger").text("Enable");
		enabled = false;
	}
});

$("#tab_operation").click(function() {
	tabSwitch("operation");
});
$("#tab_diagnostics").click(function() {
	tabSwitch("diagnostics");
});
$("#tab_setup").click(function() {
	tabSwitch("setup");
});
$("#tab_io").click(function() {
	tabSwitch("io");
});
$("#tab_charts").click(function() {
	tabSwitch("charts");
});

function tabSwitch(tab) {
	$("#" + currentTab).addClass("hidden");
	$("#tab_" + currentTab).removeAttr("selected");

	$("#" + tab).removeClass("hidden");
	$("#tab_" + tab).attr("selected", "true");
	currentTab = tab;
}

});