/*jslint white: true vars: true browser: true todo: true */
/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*global jQuery:false $:false */

/* jQuery Simulate Key-Combo Plugin 1.0
 * http://github.com/j-ulrich/jquery-simulate-ext
 * 
 * Copyright (c) 2012 Jochen Ulrich
 * Licensed under the MIT license (MIT-LICENSE.txt).
 */

/**
 * 
 * For details about key events, key codes, char codes etc. see http://unixpapa.com/js/key.html
 */

(function($,undefined) {
	"use strict";

	var ModifierKeyCodes = {
		SHIFT:		16,
		CONTROL:	17,
		ALT:		18,
		COMMAND:	91
	};

	$.extend( $.simulate.prototype, {
		
		
		/**
		 * Simulates simultaneous key presses
		 * 
		 * Expects an option called "combo" which is a string of the keys to be pressed simultaneously,
		 * separated by a plus sign ("+"). The keys are either single characters or modifier keys.
		 * The following modifier keys are supported:
		 * - "ctrl": The control key
		 * - "alt": The alt key (or option key)
		 * - "shift": The shift key
		 * - "meta": The command key on Apple keyboards
		 * 
		 * Examples of combos:
		 * - "ctrl+c"
		 * - "ctrl+alt+q"
		 * - "a+d"
		 * - "shift+k"
		 */
		simulateKeyCombo: function() {
			var target = $(this.target),
				options = this.options || {},
				eventOptions = $.extend({},options),
				combo = options.combo || "",
				comboSplit = combo.split(/(\+)/),
				plusExpected = false,
				holdKeys = [],
				i;
			
			// Remove empty parts
			comboSplit = $.grep(comboSplit, function(part) {
				return (part !== "");
			});
			
			for (i=0; i < comboSplit.length; i+=1) {
				var key = comboSplit[i],
					keyLowered = key.toLowerCase();
				
				if (plusExpected) {
					if (key !== "+") {
						throw 'Syntax error: expected "+"';
					}
				}
				else {
					var keyCode;
					switch (keyLowered) {
					case "ctrl":
					case "alt":
					case "shift":
					case "meta":
						switch (keyLowered) {
						case "ctrl":	keyCode = ModifierKeyCodes.CONTROL; break;
						case "alt":		keyCode = ModifierKeyCodes.ALT; break;
						case "shift":	keyCode = ModifierKeyCodes.SHIFT; break;
						case "meta":	keyCode = ModifierKeyCodes.COMMAND; break;
						}
						eventOptions[keyLowered+"Key"] = true;
						holdKeys.unshift(keyCode);
						eventOptions.keyCode = keyCode;
						target.simulate("keydown", eventOptions);
						break;
					default:
						if (key.length > 1) {
							throw 'Syntax error: expecting "+" between each key';
						}
						else {
							keyCode = $.simulate.prototype.simulateKeySequence.prototype.charToKeyCode(key);
							holdKeys.unshift(keyCode);
							eventOptions.keyCode = keyCode;
							eventOptions.which = keyCode;
							eventOptions.charCode = undefined;
							target.simulate("keydown", eventOptions);
							if (eventOptions.shiftKey || eventOptions.ctrlKey || eventOptions.altKey || eventOptions.metaKey) {
								key = key.toUpperCase();
							}
							eventOptions.keyCode = key.charCodeAt(0);
							eventOptions.charCode = eventOptions.keyCode;
							eventOptions.which = eventOptions.keyCode;
							target.simulate("keypress", eventOptions);
							if (options.eventsOnly !== true && !eventOptions.ctrlKey && !eventOptions.altKey && !eventOptions.metaKey) {
								target.simulate('key-sequence', {sequence: key, triggerKeyEvents: false});
							}
						}
						break;
					}
				}
					
				plusExpected = !plusExpected;
			}
			
			if (!plusExpected) {
				throw 'Syntax error: expected key (trailing "+"?)';
			}
			
			// Release keys
			eventOptions.charCode = undefined;
			for (i=0; i < holdKeys.length; i+=1) {
				eventOptions.keyCode = holdKeys[i];
				eventOptions.which = holdKeys[i];
				switch (eventOptions.keyCode) {
				case ModifierKeyCodes.ALT:
					eventOptions.altKey = false;
					break;
				case ModifierKeyCodes.SHIFT:
					eventOptions.shiftKey = false;
					break;
				case ModifierKeyCodes.CONTROL:
					eventOptions.ctrlKey = false;
					break;
				case ModifierKeyCodes.COMMAND:
					eventOptions.metaKey = false;
					break;
				default:
					 break;
				}
				target.simulate("keyup", eventOptions);				
			}
		}
		
	});
}(jQuery));