var path = require("path"),
	childProcess = require("child_process"),
	phantomjs = require("phantomjs");

module.exports = function(options) {
	var phantomBin = phantomjs.path,
		childArgs = [path.join(__dirname, 'load.js'), options.htmlFile]

	// maybe need to set all of the options as environment variables?

	childProcess.execFile(phantomBin, childArgs, function(err, stdout, stderr) {
		console.log('hello');
	});
}