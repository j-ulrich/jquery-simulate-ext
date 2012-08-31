/*jslint white: true vars: true browser: true todo: true */
/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*global noty:true jQuery:true $:true sprintf:true Roundizzle:true */

(function ($, undefined) {
	"use strict";

$(document).ready(function() {
	
	module("drag-n-drop", {
		setup: function() {
			tests.testSetup();
		},
		teardown: function() {
			tests.testTearDown();
		}
	});
	
	//####### Test Functions #######
	test("drag", function() {
		var testElement = $('#dragArea');
		var dragX = 50,
			dragY = 10;
		var expectedX = Math.round(testElement.offset().left+testElement.width()/2)+dragX,
			expectedY = Math.round(testElement.offset().top+testElement.height()/2)+dragY;
		tests.expectedEvents = [
			{type: "mousedown"},
			{type: "mousemove", pageX: expectedX, pageY: expectedY}
		];
		
		testElement.simulate("drag", {dx: dragX, dy: dragY});
	});
	
	test("drop", function() {
		var testElement = $('#dropArea');
		
		var expectedX = Math.round(testElement.offset().left+testElement.width()/2),
			expectedY = Math.round(testElement.offset().top+testElement.height()/2);
		
		tests.expectedEvents = [
			{type: "mousemove", pageX: expectedX, pageY: expectedY}, // A drop without an active drag moves the mouse onto the target before dropping
			{type: "mouseup"}
		];
		
		testElement.simulate("drop");
	});
	
	test("drag-n-drop", function() {
		var testElement = $('#dragArea');
		
		var dragX = 50,
			dragY = 10;
		var expectedX = Math.round(testElement.offset().left+testElement.width()/2)+dragX,
			expectedY = Math.round(testElement.offset().top+testElement.height()/2)+dragY;

		tests.expectedEvents = [
			{type: "mousedown"},
			{type: "mousemove", pageX: expectedX, pageY: expectedY},
			{type: "mouseup"}
		];
		
		testElement.simulate("drag-n-drop", {dx: dragX, dy: dragY});
	});
	
	test("move-before-drop", function() {
		var dragElement = $('#dragArea'),
			dropElement = $('#dropArea');
		
		var expectedX = Math.round(dropElement.offset().left+dropElement.width()/2),
			expectedY = Math.round(dropElement.offset().top+dropElement.height()/2);
		
		tests.expectedEvents = [
			{type: "mousedown"},
			{type: "mousemove", pageX: expectedX, pageY: expectedY},
			{type: "mouseup"}
		];
		
		dragElement.simulate("drag");
		dropElement.simulate("drop");
	});
	
	test("drag-n-drop-onTarget", function() {
		var dragElement = $('#dragArea'),
			dropElement = $('#dropArea');
		
		var expectedX = Math.round(dropElement.offset().left+dropElement.width()/2),
			expectedY = Math.round(dropElement.offset().top+dropElement.height()/2);
		
		tests.expectedEvents = [
			{type: "mousedown"},
			{type: "mousemove", pageX: expectedX, pageY: expectedY},
			{type: "mouseup"}
		];
		
		dragElement.simulate("drag-n-drop", {dropTarget: dropElement});
	});

	test("interpolated-drag", function() {
		var dragElement = $('#dragArea');
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 5,
			dragX = 60,
			dragY = 40;
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*Math.round(dragX/(stepCount+1)), pageY: dragStartY+i*Math.round(dragY/(stepCount+1)) });
		}
		tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+dragX, pageY: dragStartY+dragY });
		
		dragElement.simulate("drag", {dx: dragX, dy: dragY, interpolation: {stepCount: stepCount}});
	});

	test("interpolated-drag-length", function() {
		var dragElement = $('#dragArea');
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			stepLength = 30,
			dragWidth = (stepCount+1)*stepLength;
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepLength, pageY: dragStartY });
		}
		
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepLength: stepLength}});
	});

	test("interpolated-drag-count", function() {
		var dragElement = $('#dragArea');
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepLength = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepLength, pageY: dragStartY });
		}
		
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount}});
	});

	test("interpolated-shaky-drag", function() {
		var dragElement = $('#dragArea');
		var actualYPositions = [];
		
		var shakyAmplitude = 5;
		
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventShaky(event) {
			for (var prop in tests.expectedEvents[0]) {
				if (tests.expectedEvents[0].hasOwnProperty(prop)) {
					if (prop === "pageX" || prop === "pageY") {
						QUnit.close(event[prop], tests.expectedEvents[0][prop], shakyAmplitude, "Comparing "+prop+" (expected: "+tests.expectedEvents[0][prop]+"±"+shakyAmplitude+")");
						if (prop === "pageY") {
							actualYPositions[event[prop]] = actualYPositions[event[prop]]+1 || 1;
						}
					}
					else {
						strictEqual(event[prop], tests.expectedEvents[0][prop], "Comparing "+prop+" (expected: "+tests.expectedEvents[0][prop]+")");
					}
				}
			}
			if (event.type === tests.expectedEvents[0].type) {
				tests.expectedEvents.shift();
			}

		}
		$(document).off("mousemove", "#qunit-fixture", tests.assertExpectedEvent).on("mousemove", "#qunit-fixture", assertExpectedEventShaky);
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepLength = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepLength, pageY: dragStartY });
		}
		
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount, shaky: shakyAmplitude}});
		
		var posCounter = 0;
		for (var i in actualYPositions) {
			if (actualYPositions.hasOwnProperty(i)) {
				posCounter += 1;
			}
		}
		ok(posCounter > 1, "Verify shaky positions are random (if this test fails, rerun to rule out the unlikely case that all random positions are equal)");
		
		// Rebind "normal" assertExpectedEvent function
		$(document).off("mousemove", "#qunit-fixture", assertExpectedEventShaky).on("mousemove", "#qunit-fixture", tests.assertExpectedEvent);
	});

	
	test("interpolated-delayed-drag", function() {
		var dragElement = $('#dragArea');
		
		var stepDelay = 100,
			lastEventOccurrence;
		
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventDelay(event) {
			var delay = Date.now() - lastEventOccurrence;
			ok(delay >= stepDelay-10, "Verify events occur delayed (delay: "+delay+")"); // stepDelay-10 means tolerance of 10ms
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
		$(document).off("mousemove", "#qunit-fixture", tests.assertExpectedEvent).on("mousemove", "#qunit-fixture", assertExpectedEventDelay);
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepLength = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepLength, pageY: dragStartY });
		}
		
		stop();
		lastEventOccurrence = Date.now();
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount, stepDelay: stepDelay}});
		
		setTimeout(function() {
			start();
			// Rebind "normal" assertExpectedEvent function
			$(document).off("mousemove", "#qunit-fixture", assertExpectedEventDelay).on("mousemove", "#qunit-fixture", tests.assertExpectedEvent);
		},(stepCount+2)*stepDelay);
	});

	test("interpolated-delayed-drag-duration", function() {
		var dragElement = $('#dragArea');
		
		var stepDelay = 100,
			lastEventOccurrence;
		
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventDelay(event) {
			var delay = Date.now() - lastEventOccurrence;
			ok(delay >= stepDelay-10, "Verify events occur delayed (delay: "+delay+")"); // stepDelay-10 means tolerance of 10ms
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
		$(document).off("mousemove", "#qunit-fixture", tests.assertExpectedEvent).on("mousemove", "#qunit-fixture", assertExpectedEventDelay);
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepLength = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepLength, pageY: dragStartY });
		}
		
		stop();
		lastEventOccurrence = Date.now();
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount, duration: (stepCount+1)*stepDelay}});
		
		setTimeout(function() {
			start();
			// Rebind "normal" assertExpectedEvent function
			$(document).off("mousemove", "#qunit-fixture", assertExpectedEventDelay).on("mousemove", "#qunit-fixture", tests.assertExpectedEvent);
		},(stepCount+2)*stepDelay);
	});

});
	
}(jQuery));