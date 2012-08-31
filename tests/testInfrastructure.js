/*jslint white: true vars: true browser: true todo: true */
/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*global noty:true jQuery:true $:true sprintf:true Roundizzle:true */

(function ($, undefined) {
	"use strict";

	//####### Test Infrastructure #######
	// Global object
	window.tests = {
		expectedEvents: [],
		
		assertExpectedEvent: function(event) {
			/*
			var msg = event.type+" triggered";
			if (event.type.indexOf('key') === 0) {
				msg += " (which: "+event.which+")";
			}
			else if (event.type.indexOf('mouse') === 0) {
				msg += " (x: "+event.pageX+", y: "+event.pageY+")";
			}
			*/
			if (tests.expectedEvents.length === 0) {
				ok(false, "Unexpected event: "+event.type);
				return;
			}
			for (var prop in tests.expectedEvents[0]) {
				if (tests.expectedEvents[0].hasOwnProperty(prop)) {
					strictEqual(event[prop], tests.expectedEvents[0][prop], "Comparing "+prop+" (expected: "+tests.expectedEvents[0][prop]+")");
				}
			}
			if (event.type === tests.expectedEvents[0].type) {
				tests.expectedEvents.shift();
			}
		},
		
		testSetup: function() {
			tests.expectedEvents = [];
		},
		
		testTearDown: function() {
			var event;
			while ( (event = tests.expectedEvents.shift()) !== undefined) {
				if (event.type) {
					ok(false, "Missing event: "+event.type);
				}
				else {
					ok(false, "Missing event: "+event);
				}
			}
			$(document).simulate("drop");
		}
	};
	
	$(document).on({
		keyup: tests.assertExpectedEvent,
		keydown: tests.assertExpectedEvent,
		keypress: tests.assertExpectedEvent,
		mousedown: tests.assertExpectedEvent,
		mouseup: tests.assertExpectedEvent,
		mousemove: tests.assertExpectedEvent
	}, '#qunit-fixture');
	
	
}(jQuery));