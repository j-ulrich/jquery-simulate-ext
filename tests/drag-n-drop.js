/*jslint white: true vars: true browser: true todo: true */
/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*global noty:true jQuery:true $:true sprintf:true Roundizzle:true */

(function ($, undefined) {
	"use strict";

$(document).ready(function() {
	
	
	module("drag-n-drop", {
		setup: function() {
			tests.testSetup();
			$(document).on("simulate-drag simulate-drop", '#qunit-fixture', tests.assertExpectedEvent);
		},
		teardown: function() {
			$(document).off("simulate-drag simulate-drop", '#qunit-fixture');
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
			{type: "mousemove", pageX: expectedX, pageY: expectedY},
			{type: "simulate-drag"}
		];
		
		testElement.simulate("drag", {dx: dragX, dy: dragY});
	});

	test("drag-onTarget", function() {
		var testElement = $('#dragArea'),
			dropElement = $('#dropArea');

		var expectedX = Math.round(dropElement.offset().left+dropElement.width()/2),
			expectedY = Math.round(dropElement.offset().top+dropElement.height()/2);
		
		tests.expectedEvents = [
			{type: "mousedown"},
			{type: "mousemove", pageX: expectedX, pageY: expectedY},
			{type: "simulate-drag"}
		];
		
		testElement.simulate("drag", {dragTarget: dropElement});
	});

	test("drop", function() {
		var testElement = $('#dropArea');
		
		var expectedX = Math.round(testElement.offset().left+testElement.width()/2),
			expectedY = Math.round(testElement.offset().top+testElement.height()/2);
		
		tests.expectedEvents = [
			{type: "mousemove", pageX: expectedX, pageY: expectedY}, // A drop without an active drag moves the mouse onto the target before dropping
			{type: "mouseup"},
			{type: "simulate-drop"}
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
			{type: "simulate-drag"},
			{type: "mouseup", pageX: expectedX, pageY: expectedY},
			{type: "simulate-drop"}
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
			{type: "simulate-drag"},
			{type: "mousemove", pageX: expectedX, pageY: expectedY},
			{type: "mouseup"},
			{type: "simulate-drop"}
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
			{type: "simulate-drag"},
			{type: "mouseup"},
			{type: "simulate-drop"}
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
			tests.expectedEvents.push({type: "mousemove", pageX: Math.round(dragStartX+i*dragX/(stepCount+1)), pageY: Math.round(dragStartY+i*dragY/(stepCount+1)) });
		}
		tests.expectedEvents.push(
			{type: "mousemove", pageX: dragStartX+dragX, pageY: dragStartY+dragY },
			{type: "simulate-drag"}
		);
		
		dragElement.simulate("drag", {dx: dragX, dy: dragY, interpolation: {stepCount: stepCount}});
	});

	test("interpolated-drag-width", function() {
		var dragElement = $('#dragArea');
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			stepWidth = 30,
			dragWidth = (stepCount+1)*stepWidth;
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepWidth, pageY: dragStartY });
		}
		tests.expectedEvents.push({type: "simulate-drag"});
		
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepWidth: stepWidth}});
	});

	test("interpolated-drag-count", function() {
		var dragElement = $('#dragArea');
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepWidth = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepWidth, pageY: dragStartY });
		}
		tests.expectedEvents.push({type: "simulate-drag"});
		
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount}});
	});

	test("interpolated-shaky-drag", function() {
		var dragElement = $('#dragArea');
		var actualYPositions = [];
		
		var shakyAmplitude = 5;
		
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventShaky(event) {
			if (tests.expectedEvents.length === 0) {
				ok(false, "Unexpected event: "+event.type);
				return;
			}
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
			stepWidth = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepWidth, pageY: dragStartY });
		}
		tests.expectedEvents.push({type: "simulate-drag"});
		
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount, shaky: shakyAmplitude}});
		
		var posCounter = 0;
		for (var i in actualYPositions) {
			if (actualYPositions.hasOwnProperty(i)) {
				posCounter += 1;
			}
		}
		ok(posCounter > 1, "Verify shaky positions are random (if this test fails, rerun to rule out the unlikely case that all random positions are equal)");
		
	});

	
	test("interpolated-delayed-drag", function() {
		var dragElement = $('#dragArea');
		
		var stepDelay = 100,
			lastEventOccurrence;
		
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventDelay(event) {
			var delay = Date.now() - lastEventOccurrence;
			ok(delay >= stepDelay-10, "Verify events occur delayed (delay: "+delay+")"); // stepDelay-10 means tolerance of 10ms
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
			lastEventOccurrence = Date.now();
		}
		$(document).off("mousemove", "#qunit-fixture", tests.assertExpectedEvent).on("mousemove", "#qunit-fixture", assertExpectedEventDelay);
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepWidth = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepWidth, pageY: dragStartY });
		}
		tests.expectedEvents.push({type: "simulate-drag"});
		
		stop();
		lastEventOccurrence = Date.now();
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount, stepDelay: stepDelay}});
		
		setTimeout(function() {
			start();
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
			lastEventOccurrence = Date.now();
		}
		$(document).off("mousemove", "#qunit-fixture", tests.assertExpectedEvent).on("mousemove", "#qunit-fixture", assertExpectedEventDelay);
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepWidth = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepWidth, pageY: dragStartY });
		}
		tests.expectedEvents.push({type: "simulate-drag"});
		
		stop();
		lastEventOccurrence = Date.now();
		dragElement.simulate("drag", {dx: dragWidth, interpolation: {stepCount: stepCount, duration: (stepCount+1)*stepDelay}});
		
		setTimeout(function() {
			start();
		},(stepCount+2)*stepDelay);
	});

	test("interpolated-delayed-drag-n-drop", function() {
		var dragElement = $('#dragArea');
		
		var stepDelay = 100,
			lastEventOccurrence;
		
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventDelay(event) {
			var delay = Date.now() - lastEventOccurrence;
			ok(delay >= stepDelay-10, "Verify events occur delayed (delay: "+delay+")"); // stepDelay-10 means tolerance of 10ms
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
			lastEventOccurrence = Date.now();
		}
		$(document).off("mousemove", "#qunit-fixture", tests.assertExpectedEvent).on("mousemove", "#qunit-fixture", assertExpectedEventDelay);
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2);
		
		var stepCount = 2,
			dragWidth = 90,
			stepWidth = dragWidth / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: dragStartX+i*stepWidth, pageY: dragStartY });
		}
		tests.expectedEvents.push(
			{type: "simulate-drag"},
			{type: "mouseup", pageX: dragStartX+(stepCount+1)*stepWidth, pageY: dragStartY},
			{type: "simulate-drop"}
		);
		
		stop();
		lastEventOccurrence = Date.now();
		dragElement.simulate("drag-n-drop", {dx: dragWidth, interpolation: {stepCount: stepCount, stepDelay: stepDelay}});
		
		setTimeout(function() {
			start();
		},(stepCount+2)*stepDelay);
	});

	test("interpolated-delayed-drag-n-drop-onTarget", function() {
		var dragElement = $('#dragArea'),
			dropTarget = $('#dropArea');
		
		var stepDelay = 100,
			lastEventOccurrence;
		
		// Unbind "normal" assertExpectedEvent function and replace with a fuzzy variant of it
		function assertExpectedEventDelay(event) {
			var delay = Date.now() - lastEventOccurrence;
			ok(delay >= stepDelay-10, "Verify events occur delayed (delay: "+delay+")"); // stepDelay-10 means tolerance of 10ms
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
			lastEventOccurrence = Date.now();
		}
		$(document).off("mousemove", "#qunit-fixture", tests.assertExpectedEvent).on("mousemove", "#qunit-fixture", assertExpectedEventDelay);
		
		var dragStartX = Math.round(dragElement.offset().left+dragElement.width()/2),
			dragStartY = Math.round(dragElement.offset().top+dragElement.height()/2),
			dragEndX = Math.round(dropTarget.offset().left+dropTarget.width()/2),
			dragEndY = Math.round(dropTarget.offset().top+dropTarget.height()/2);
		
		var stepCount = 2,
			stepWidthX = (dragEndX - dragStartX) / (stepCount+1),
			stepWidthY = (dragEndY - dragStartY) / (stepCount+1);
		
		tests.expectedEvents = [{type: "mousedown"}];
		for (var i=1; i <= stepCount+1; i+=1) {
			tests.expectedEvents.push({type: "mousemove", pageX: Math.round(dragStartX+i*stepWidthX), pageY: Math.round(dragStartY+i*stepWidthY) });
		}
		tests.expectedEvents.push(
			{type: "simulate-drag"},
			{type: "mouseup", pageX: dragEndX, pageY: dragEndY},
			{type: "simulate-drop"}
		);
		
		stop();
		lastEventOccurrence = Date.now();
		dragElement.simulate("drag-n-drop", {dropTarget: dropTarget, interpolation: {stepCount: stepCount, stepDelay: stepDelay}});
		
		setTimeout(function() {
			start();
		},(stepCount+2)*stepDelay);
	});

});
	
}(jQuery));