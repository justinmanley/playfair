var path = require('path'),
	fs = require('fs'),
	_ = require('underscore'),
	phantomjs = require('phantomjs'),
	phantom = require('phantom');


module.exports = function(options) {
	_.defaults(options, {
		global: false,
		output: 'output.svg'
	});

	phantom.create({ binary: phantomjs.path }, function(ph) {
		var writeSvg;

		writeSvg = function(result) {
			var svg = result.svg.text;

			fs.writeFile(options.output, svg, { encoding: 'utf8'}, function(err) {
				if (err) throw err;
			});

			ph.exit();
		};

		ph.createPage(function(page) {
			page.open(options.htmlFile, function(status) {
				page.evaluate(function() {
					svgNode = document.querySelector('svg');

					tmp = document.createElement('div');
					tmp.appendChild(svgNode);
					
					return { 
						svg: { node: svgNode, text: tmp.innerHTML } 
					};
				}, writeSvg);		
			});		
		});
	});
}
