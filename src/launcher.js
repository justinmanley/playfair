var path = require("path"),
	childProcess = require("child_process"),
	phantomjs = require("phantomjs");

module.exports = function() {
	var bin = phantomjs.path,
		childArgs = [path.join(__dirname, 'phantomjs-script.js')]

	childProcess.execFile(bin, childArgs, function(err, stdout, stderr) {
		console.log('hello');
		console.log(err);
	});
}