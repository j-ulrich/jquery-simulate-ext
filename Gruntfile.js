/*global module:false require:true*/
module.exports = function(grunt) {
	"use strict";
	
	var fs = require('fs');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>' + "\n" +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.contributors[0].name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
				' */'
		},
		
		jshint: {
			options: {
				"-W106": true, // Ignore warning "Identifier 'ext_disableQuirkDetection' is not in camel case."
				globals: {
					jQuery: true,
					"$": true,
					bililiteRange: true
				},
			},
			tests: {
				options: {
					jshintrc: true
				},
				src: ['tests/drag-n-drop.js', 'tests/key-combo.js', 'tests/key-sequence.js', 'tests/testInfrastructure.js']
			},
			src: ['src/*.js', 'libs/jquery.simulate.js'],
			grunt: 'Gruntfile.js',
		},
		
		qunit: {
			files: ['tests/tests.html']
		},
		
		concat: {
			'ext-only': {
				src: ['src/jquery.simulate.ext.js', 'src/jquery.simulate.drag-n-drop.js', 'src/jquery.simulate.key-sequence.js', 'src/jquery.simulate.key-combo.js'],
				dest: 'dist/jquery.simulate.ext.<%= pkg.version %>.js'
			},
			complete: {
				src: ['libs/bililiteRange.js', 'libs/jquery.simulate.js', 'src/jquery.simulate.ext.js', 'src/jquery.simulate.drag-n-drop.js', 'src/jquery.simulate.key-sequence.js', 'src/jquery.simulate.key-combo.js'],
				dest: 'dist/jquery.simulate.ext.<%= pkg.version %>.complete.js'
			}
		},
		
/* uglify task is not working correctly at the moment (strips away copyright notices)
 * therefore, we cannot use it

		uglify: {
			'ext-only': {
				options: {
					banner: '<%= meta.banner %>'
				},
				src: ['<%= concat["ext-only"].dest %>'],
				dest: 'dist/jquery.simulate.ext.<%= pkg.version %>.min.js'
			},
			complete: {
				options: {
					preserveComments: function(node, comment) {
						if (comment.value.search(/Copyright/i) != -1)
							return true;
						else
							return false;
					}
				},
				src: ['<%= concat["complete"].dest %>'],
				dest: 'dist/jquery.simulate.ext.<%= pkg.version %>.complete.min.js'
			}
		},
*/		
		
		"multi-banner-min": {
			complete: {
				src: ['<banner:meta.simulate-banner>', 'libs/jquery.simulate.js', '<banner:meta.banner>', '<%= concat["ext-only"].dest %>'],
				dest: 'dist/jquery.simulate.ext.<%= pkg.version %>.complete.min.js'
			}
		}
		
	});
	

	// Default task.
	grunt.registerTask('default', ['jshint', 'qunit', 'concat']);

};
