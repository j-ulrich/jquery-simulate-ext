/*global module:false require:true*/
module.exports = function(grunt) {
	"use strict";
	
	var fs = require('fs');
	
	var jshintrcs = {
		tests: JSON.parse(fs.readFileSync('tests/.jshintrc'))
	};

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.contributors[0].name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n'+
				' */'
		},
		lint: {
			src: ['src/*.js', 'libs/jquery.simulate.js'],
			grunt: 'grunt.js',
			tests: ['tests/drag-n-drop.js', 'tests/key-combo.js', 'tests/key-sequence.js', 'tests/testInfrastructure.js']
		},
		qunit: {
			files: ['tests/tests.html']
		},
		concat: {
			dist: {
				src: ['<banner:meta.banner>', 'src/jquery.simulate.ext.js', 'src/jquery.simulate.drag-n-drop.js', 'src/jquery.simulate.key-sequence.js', 'src/jquery.simulate.key-combo.js'],
				dest: 'dist/jquery.simulate.ext.<%= pkg.version %>.complete.js'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'dist/jquery.simulate.ext.<%= pkg.version %>.complete.min.js'
			}
		},
		watch: {
			files: ['<config:lint.src>', '<config:lint.tests>'],
			tasks: 'lint qunit'
		},
		jshint: {
			options: {
				camelcase: true,
				plusplus: true,
				forin: true,
				noarg: true,
				noempty: true,
				eqeqeq: true,
				bitwise: true,
				strict: true,
				undef: true,
				unused: true,
				curly: true,
				browser: true,
				devel: true,
				white: false,
				onevar: false,
				smarttabs: true
			},
			globals: {
				jQuery: true,
				$: true
			},
			tests: {options: jshintrcs.tests, globals: jshintrcs.tests.globals}
//			tests: {jshintrc: 'tests/.jshintrc'}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'lint qunit concat min');

};
