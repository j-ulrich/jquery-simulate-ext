;(function($, undefined) {
	
	// Taken from jquery.simulate.js
	function findCenter( elem ) {
		var offset,
			document = $( elem.ownerDocument );
		elem = $( elem );
		offset = elem.offset();
		
		return {
			x: offset.left + elem.outerWidth() / 2 - document.scrollLeft(),
			y: offset.top + elem.outerHeight() / 2 - document.scrollTop()
		};
	}

	$.extend( $.simulate.prototype, {
		
		
		/* TODO: Implement interpolation (option: number of points between start & target) and shaky drag (option: intensity of the shake)
		 * Alternative option for interpolation: maximal length of distance without interpolation point (-> this makes it
		 * independent of the move distance)
		 */
		simulateDrag: function() {
			var target = this.target,
				options = this.options,
				center = findCenter( target ),
				x = Math.floor( center.x ),
				y = Math.floor( center.y ), 
				dx = Math.floor( options.dx || 0 ),
				dy = Math.floor( options.dy || 0 ),
				coord = { clientX: x, clientY: y };
			
			if ($.simulate.activeDrag && $.simulate.activeDrag.dragElement === target) {
				// We just continue to move the dragged element
				$.simulate.activeDrag.dragDistance.x += dx;
				$.simulate.activeDrag.dragDistance.y += dy;				
			}
			else {
				// We start a new drag
				this.simulateEvent( target, "mousedown", coord );
				$.extend($.simulate, {
					activeDrag: {
						dragElement: target,
						dragStart: { x: x, y: y },
						dragDistance: { x: dx, y: dy }
					}
				});
				$(target).add(document).one('mouseup', function() {
					$.simulate.activeDrag = undefined;
				});
			}

			if (dx !== 0 || dy !== 0) {
				coord = { clientX: x + dx, clientY: y + dy };
				this.simulateEvent( document, "mousemove", coord );
			}
		},
		
		/**
		 * Simulates a drop.
		 * 
		 * The position where the drop occurs is determined in the following way:
		 * 1.) If there is an active drag with a distance dx != 0 and dy != 0, the drop occurs
		 * at the end position of that drag.
		 * 2.) If there is no active drag or the distance of the active drag is 0 (i.e. dx == 0 and
		 * dy == 0), then the drop occurs at the center of the target given to the drop. In this case,
		 * the mouse is moved onto the center of the target before the drop is simulated.
		 * In both cases, an active drag will be ended.
		 */
		simulateDrop: function() {
			var target = this.target,
				activeDrag = $.simulate.activeDrag,
				options = this.options,
				center = findCenter( target ),
				x = Math.floor( center.x ),
				y = Math.floor( center.y ),
				coord = { clientX: x, clientY: y };
			
			if (activeDrag && (activeDrag.dragDistance.x !== 0 || activeDrag.dragDistance.y !== 0)) {
				// We already moved the mouse during the drag so we just simulate the drop on the end position
				x = activeDrag.dragStart.x + activeDrag.dragDistance.x;
				y = activeDrag.dragStart.y + activeDrag.dragDistance.y;
				coord = { clientX: x, clientY: y };
			}
			else {
				// Else we assume the drop should happen on target, so we move there
				this.simulateEvent( document, "mousemove", coord );
			}
			
			this.simulateEvent( target, "mouseup", coord );
			this.simulateEvent( target, "click", coord );
			$.simulate.activeDrag = undefined;
		},
		
		simulateDragNDrop: function() {
			var target = this.target,
				options = this.options,
				dropTarget = options.dropTarget || target,
				dx = (options.dropTarget)? 0 : (options.dx || 0),
				dy = (options.dropTarget)? 0 : (options.dy || 0),
				dragDistance = { dx: dx, dy: dy };
			
			$(target).simulate( "drag", dragDistance );
			$(dropTarget).simulate( "drop" );
		}
	});
	
}(jQuery));