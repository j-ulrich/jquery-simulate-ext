/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*jslint white: true vars: true browser: true todo: true */
/*global jQuery:true $:true */

/* jQuery Simulate Key-Combo Plugin 1.2.0
 * http://github.com/j-ulrich/jquery-simulate-ext
 * 
 * Copyright (c) 2013 Jochen Ulrich
 * Licensed under the MIT license (MIT-LICENSE.txt).
 */

/**
 * 
 * For details about key events, key codes, char codes etc. see http://unixpapa.com/js/key.html
 */

;(function($,undefined) {
	"use strict";

	/**
	 * Key codes of special keys.
	 * @private
	 * @author julrich
	 * @since 1.3.0
	 */
	var SpecialKeyCodes = {
		// Modifier Keys
		SHIFT:			16,
		CONTROL:		17,
		ALTERNATIVE:	18,
		META:			91,
		// Arrow Keys
		LEFT_ARROW:		37,
		UP_ARROW:		38,
		RIGHT_ARROW:	39,
		DOWN_ARROW:		40,
		// Function Keys
		F1:				112,
		F2:				113,
		F3:				114,
		F4:				115,
		F5:				116,
		F6:				117,
		F7:				118,
		F8:				119,
		F9:				120,
		F10:			121,
		F11:			122,
		F12:			123,
		// Other
		ENTER:			13,
		TABULATOR:		 9,
		ESCAPE:			27,
		BACKSPACE:		 8,
		INSERT:			45,
		DELETE:			46,
		HOME:			36,
		END:			35,
		PAGE_UP:		33,
		PAGE_DOWN:		34,

	};
	
	// SpecialKeyCode aliases
	SpecialKeyCodes.CTRL 	= SpecialKeyCodes.CONTROL;
	SpecialKeyCodes.ALT		= SpecialKeyCodes.ALTERNATIVE;
	SpecialKeyCodes.COMMAND	= SpecialKeyCodes.META;
	SpecialKeyCodes.TAB		= SpecialKeyCodes.TABULATOR;
	SpecialKeyCodes.ESC		= SpecialKeyCodes.ESCAPE;
	

	$.extend( $.simulate.prototype,
			
	/**
	 * @lends $.simulate.prototype
	 */		
	{
		
		
		/**
		 * Simulates simultaneous key presses
		 * 
		 * @see https://github.com/j-ulrich/jquery-simulate-ext/blob/master/doc/key-combo.md
		 * @public
		 * @author julrich
		 * @since 1.0
		 */
		simulateKeyCombo: function() {
			var $target = $(this.target),
				options = $.extend({
					combo: "",
					eventsOnly: false
				}, this.options),
				eventOptions = {},
				combo = options.combo,
				comboSplit = combo.split(/(\+)/),
				plusExpected = false,
				holdKeys = [],
				i;
			
			if (combo.length === 0) {
				return;
			}
			
			// Remove empty parts
			comboSplit = $.grep(comboSplit, function(part) {
				return (part !== "");
			});
			
			for (i=0; i < comboSplit.length; i+=1) {
				var key = comboSplit[i],
					keyLowered = key.toLowerCase(),
					keySpecial = key.toUpperCase().replace('-','_');
				
				if (plusExpected) {
					if (key !== "+") {
						throw 'Syntax error: expected "+"';
					}
					else {
						plusExpected = false;
					}
				}
				else {
					if ( key.length > 1) {
						// Assume a special key
						var keyCode = SpecialKeyCodes[keySpecial];
						
						if (keyCode == undefined) {
							throw 'Syntax error: unknown special key "'+key+'" (forgot "+" between keys?)';
						}
						
						switch (keyCode) {
						case SpecialKeyCodes.CONTROL:
						case SpecialKeyCodes.ALT:
						case SpecialKeyCodes.SHIFT:
						case SpecialKeyCodes.META:
							eventOptions[keyLowered+"Key"] = true;
							break;
						}
						holdKeys.unshift(keyCode);
						eventOptions.keyCode = keyCode;
						eventOptions.which = keyCode;
						eventOptions.charCode = 0;
						$target.simulate("keydown", eventOptions);
						
					}
					else {
						// "Normal" key
						var keyCode = $.simulate.prototype.simulateKeySequence.prototype.charToKeyCode(key);
						holdKeys.unshift(keyCode);
						eventOptions.keyCode = keyCode;
						eventOptions.which = keyCode;
						eventOptions.charCode = undefined;
						$target.simulate("keydown", eventOptions);
						if (eventOptions.shiftKey) {
							key = key.toUpperCase();
						}
						eventOptions.keyCode = key.charCodeAt(0);
						eventOptions.charCode = eventOptions.keyCode;
						eventOptions.which = eventOptions.keyCode;
						$target.simulate("keypress", eventOptions);
						if (eventsOnly !== true && !eventOptions.ctrlKey && !eventOptions.altKey && !eventOptions.metaKey) {
							$target.simulate('key-sequence', {sequence: key, triggerKeyEvents: false});
						}
					}
					
					plusExpected = true;
				}
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
				case SpecialKeyCodes.ALT:		eventOptions.altKey = false; break;
				case SpecialKeyCodes.SHIFT:		eventOptions.shiftKey = false; break;
				case SpecialKeyCodes.CONTROL:	eventOptions.ctrlKey = false; break;
				case SpecialKeyCodes.META:		eventOptions.metaKey = false; break;
				default:
					break;
				}
				$target.simulate("keyup", eventOptions);				
			}
		}
		
	});
}(jQuery));