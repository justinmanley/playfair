#!/usr/bin/env node

var playfair = require("commander"),
	pkg = require(__dirname + '/package.json'),
	capture = require("./src/capture");

var options;

playfair
	.version(pkg.version)
	.usage('[options] <html file ...>')
	.option('-o --output <path>', 'Name for the output file.')
	.option('-i --id <id>', 'ID of the SVG element (if there are more than one)');

playfair
	.parse(process.argv);

options = {
	id: playfair.id,
	output: playfair.output,
	htmlFile: playfair.args[0],
};

capture(options);
