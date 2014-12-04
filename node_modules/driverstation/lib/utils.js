exports.getTeamIP = function(teamID) {
	teamID = String(teamID);

	var first = teamID.substring(0, teamID.length - 2);
	var second = teamID.substring(teamID.length - 2);

	if (first == "") first = "0";
	if (second == "") second = "0";

	return "10." + first + "." + second + ".2";
};

exports.validTeamID = function(teamID) {
	if ( !Number.isInteger(teamID) ) {
		return new Error('Invalid Type');
		console.log(teamID);
		console.log(typeof teamID);
	} else if (teamID < 1 || teamID > 9999) {
		return new Error('Invalid Range');
	}
	return true;
};

/*\
|*|
|*|  :: Number.isInteger() polyfill ::
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
|*|
\*/

if (!Number.isInteger) {
  Number.isInteger = function isInteger (nVal) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
  };
}