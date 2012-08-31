/*jslint white: true vars: true browser: true todo: true */
/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*global noty:true jQuery:true $:true sprintf:true Roundizzle:true */

(function ($, undefined) {
	"use strict";

$(document).ready(function() {
	
	module("key-sequence", {
		setup: function() {
			tests.testSetup();
		},
		teardown: function() {
			tests.testTearDown();
		}
	});
	
	//####### Test Functions #######
	test("simple sequence", function() {
		var testElement = $('#textInput');
		
		tests.expectedEvents = [
			/* f */ {type: "keydown", keyCode: 70}, {type: "keypress", which: "f".charCodeAt(0)}, {type: "keyup", keyCode: 70},
			/* O */ {type: "keydown", keyCode: 79}, {type: "keypress", which: "O".charCodeAt(0)}, {type: "keyup", keyCode: 79},
			/* 0 */ {type: "keydown", keyCode: 48}, {type: "keypress", which: "0".charCodeAt(0)}, {type: "keyup", keyCode: 48},
			/* B */ {type: "keydown", keyCode: 66}, {type: "keypress", which: "B".charCodeAt(0)}, {type: "keyup", keyCode: 66},
			/* a */ {type: "keydown", keyCode: 65}, {type: "keypress", which: "a".charCodeAt(0)}, {type: "keyup", keyCode: 65},
			/* R */ {type: "keydown", keyCode: 82}, {type: "keypress", which: "R".charCodeAt(0)}, {type: "keyup", keyCode: 82},
			/* 1 */ {type: "keydown", keyCode: 49}, {type: "keypress", which: "1".charCodeAt(0)}, {type: "keyup", keyCode: 49}
		];
		
		var testSequence = "fO0BaR1";
		testElement.simulate("key-sequence", {sequence: testSequence});
		
		strictEqual(testElement.val(), testSequence, "Verify result of sequence");
	});

	test("no events", function() {
		var testElement = $('#textInput');
		
		tests.expectedEvents = [
		];
		
		var testSequence = "fO0BaR1";
		testElement.simulate("key-sequence", {sequence: testSequence, triggerKeyEvents: false});
		
		strictEqual(testElement.val(), testSequence, "Verify result of sequence");
	});

	test("special characters", function() {
		var testElement = $('#textInput');
		
		tests.expectedEvents = [
			/* _ */ {type: "keydown", keyCode: 189}, {type: "keypress", which: "_".charCodeAt(0)}, {type: "keyup", keyCode: 189},
			/* - */ {type: "keydown", keyCode: 189}, {type: "keypress", which: "-".charCodeAt(0)}, {type: "keyup", keyCode: 189},
			/* . */ {type: "keydown", keyCode: 190}, {type: "keypress", which: ".".charCodeAt(0)}, {type: "keyup", keyCode: 190},
			/* , */ {type: "keydown", keyCode: 188}, {type: "keypress", which: ",".charCodeAt(0)}, {type: "keyup", keyCode: 188},
			/* ; */ {type: "keydown", keyCode: 186}, {type: "keypress", which: ";".charCodeAt(0)}, {type: "keyup", keyCode: 186},
			/* : */ {type: "keydown", keyCode: 186}, {type: "keypress", which: ":".charCodeAt(0)}, {type: "keyup", keyCode: 186},
			/* + */ {type: "keydown", keyCode: 187}, {type: "keypress", which: "+".charCodeAt(0)}, {type: "keyup", keyCode: 187},
			/* ! */ {type: "keydown", keyCode: 49}, {type: "keypress", which: "!".charCodeAt(0)}, {type: "keyup", keyCode: 49},
			/* ? */ {type: "keydown", keyCode: 191}, {type: "keypress", which: "?".charCodeAt(0)}, {type: "keyup", keyCode: 191}
		];
		
		testElement.simulate("key-sequence", {sequence: "_-.,;:+!?"});
	});
	
	test("special sequences", function() {
		var testElement = $('#textInput');
		
		tests.expectedEvents = [
			/* a */ {type: "keydown", keyCode: 65}, {type: "keypress", which: "a".charCodeAt(0)}, {type: "keyup", keyCode: 65},
			/* s */ {type: "keydown", keyCode: 83}, {type: "keypress", which: "s".charCodeAt(0)}, {type: "keyup", keyCode: 83},
			/* {del} */ {type: "keydown", keyCode: 46}, {type: "keyup", keyCode: 46},
			/* f */ {type: "keydown", keyCode: 70}, {type: "keypress", which: "f".charCodeAt(0)}, {type: "keyup", keyCode: 70},
			/* {leftarrow} */ {type: "keydown", keyCode: 37}, {type: "keyup", keyCode: 37},
			/* { */ {type: "keydown", keyCode: 219}, {type: "keypress", which: "{".charCodeAt(0)}, {type: "keyup", keyCode: 219},
			/* b */ {type: "keydown", keyCode: 66}, {type: "keypress", which: "b".charCodeAt(0)}, {type: "keyup", keyCode: 66},
			/* {rightarrow} */ {type: "keydown", keyCode: 39}, {type: "keyup", keyCode: 39},
			/* {backspace} */ {type: "keydown", keyCode: 8}, {type: "keyup", keyCode: 8}
		];
		
		testElement.simulate("key-sequence", {sequence: "as{selectall}{del}f{leftarrow}{{}b{rightarrow}{backspace}"});
		
		strictEqual(testElement.val(), "{b", "Verify result of sequence (this is known to fail in IE < 10.0)");
	});
	
	test("delay", function() {
		var testElement = $('#textInput');
		
		tests.expectedEvents = [
			/* t */ {type: "keydown", keyCode: 84}, {type: "keypress", which: "t".charCodeAt(0)}, {type: "keyup", keyCode: 84},
			/* e */ {type: "keydown", keyCode: 69}, {type: "keypress", which: "e".charCodeAt(0)}, {type: "keyup", keyCode: 69},
			/* s */ {type: "keydown", keyCode: 83}, {type: "keypress", which: "s".charCodeAt(0)}, {type: "keyup", keyCode: 83},
			/* t */ {type: "keydown", keyCode: 84}, {type: "keypress", which: "t".charCodeAt(0)}, {type: "keyup", keyCode: 84}
		];
		
		var keyDelay = 100,
			testSequence = "test",
			lastEventOccurrence;
	
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventDelay(event) {
			var delay = Date.now() - lastEventOccurrence;
			ok(delay >= keyDelay-10, "Verify events occur delayed (delay: "+delay+")"); // keyDelay-10 means tolerance of 10ms
			for (var prop in tests.expectedEvents[0]) {
				if (tests.expectedEvents[0].hasOwnProperty(prop)) {
					strictEqual(event[prop], tests.expectedEvents[0][prop], "Comparing "+prop+" (expected: "+tests.expectedEvents[0][prop]+")");
				}
			}
			if (event.type === tests.expectedEvents[0].type) {
				tests.expectedEvents.shift();
			}
			lastEventOccurrence = Date.now();
		}
		$(document).off("keydown", "#qunit-fixture", tests.assertExpectedEvent).on("keydown", "#qunit-fixture", assertExpectedEventDelay);
		
		stop();
		lastEventOccurrence = Date.now()-keyDelay; // The first key simulated without delay
		
		testElement.simulate("key-sequence", {sequence: testSequence, delay: keyDelay});
		
		setTimeout(function() {
			start();
		},(testSequence.length+2)*keyDelay);

	});


});
	
}(jQuery));