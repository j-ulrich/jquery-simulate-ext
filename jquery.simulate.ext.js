/* jQuery Simulate Extended Plugin 1.0
 * http://github.com/j-ulrich/jquery-simulate-ext
 * 
 * Copyright (c) 2012 Jochen Ulrich
 * Licensed under the MIT license (MIT-LICENSE.txt).
 */

;(function( $ ) {

	/* Overwrite the $.simulate.prototype.mouseEvent function
	 * to convert pageX/Y to clientX/Y
	 */
	var originalMouseEvent = $.simulate.prototype.mouseEvent;
	$.simulate.prototype.mouseEvent = function(type, options) {
		if (options.pageX || options.pageY) {
			var doc = $(document);
			options.clientX = (options.pageX || 0) - doc.scrollLeft();
			options.clientY = (options.pageY || 0) - doc.scrollTop();
		}
		return originalMouseEvent.apply(this, [type, options]);
	};
	
})( jQuery );
