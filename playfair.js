#!/usr/bin/env node

var playfair = require("commander"),
	pkg = require(__dirname + '/package.json'),
	launch = require(__dirname + "/src/launcher");

playfair
	.version(pkg.version)
	.usage('[options] <html file ...>')
	.option('-s --stylesheet [Path]', 'Stylesheet (or stylesheets).')
	.option('-d --data [Path]', 'Dataset (or datasets) to pass to the visualization script.')
	.option('-o --output Path', 'Name for the output file.')
	.option('-i --id String', 'ID of the SVG element (if there are more than one)');

playfair
	.parse(process.argv);

var options = {
	svgID: playfair.id,
	htmlFile: playfair.args[0],
	global: false
};

launch(options);
