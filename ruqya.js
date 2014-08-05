#!/usr/bin/env node

var args = require("commander"),
	pkg = require(__dirname + '/package.json'),
	launch = require(__dirname + "/src/launcher");

args
	.version(pkg.version)
	.option('-s --stylesheet [Path]', 'Stylesheet (or stylesheets).')
	.option('-d --data [Path]', 'Dataset (or datasets) to pass to the visualization script.')
	.option('-o --output Path', 'Name for the output file.')

args
	.command('make')
	.action(function() {
		launch();
	});

args.parse(process.argv)