var path = require('path'),
	fs = require('fs'),
	_ = require('underscore'),
	phantomjs = require('phantomjs'),
	phantom = require('phantom');


module.exports = function(options) {
	var selector;

	_.defaults(options, {
		output: options.id ? options.id + '.svg' : 'output.svg'
	});

	selector = options.id ? 'svg#' + options.id : 'svg';

	phantom.create({ binary: phantomjs.path }, function(ph) {
		var writeSvg;

		writeSvg = function(result) {
			if (result.text) {
				fs.writeFile(options.output, result.text, { encoding: 'utf8'}, function(err) {
					if (err) {
						throw err;
					} else {
						console.log("Wrote SVG output to " + options.output + ".");
					}
				});
			} else {
				console.error("ERROR: There is no DOM node matching the selector \"" + selector + "\".");
			}

			ph.exit();
		};

		/*
		 * NOTE: Because of the way the phantomjs-node bridge is structured, 
		 * retrieveSvgText is completely sandboxed when it is executed in the
		 * PhantomJS browser and has no access to the context where it is defined.
		 */
		getSvg = function(selector) {
			var	svgNode, tmp;

			svgNode = document.querySelector(selector);

			if (svgNode) {
				tmp = document.createElement('div');
				tmp.appendChild(svgNode);
				result = { text: tmp.innerHTML };
			} else {
				result = {};
			}

			return result;
		};

		/* Handles the actual business of rendering and retrieving the SVG image. */
		ph.createPage(function(page) {
			page.open(options.htmlFile, function(status) {
				page.evaluate(getSvg, writeSvg, selector);		
			});		
		});
	});
}
