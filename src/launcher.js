var path = require("path"),
	phantomjs = require("phantomjs"),
	phantom = require("phantom");


module.exports = function(options) {
	var htmlFile = options.htmlFile;

	phantom.create({ binary: phantomjs.path }, function(ph) {
		ph.createPage(function(page) {
			page.open(htmlFile, function(status) {
				console.log("opened file? ", status);
				ph.exit();
			});
		});
	});
}