var page = require('webpage').create(),
	system = require('system');

page.open(system.args[1], function() {
	page.render('github.png');
	phantom.exit();
});