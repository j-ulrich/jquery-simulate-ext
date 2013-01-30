jQuery Simulate Extended Changelog
==================================

Version 1.1.4 - (Released: 2013-01-30)
-------------
* Extends the documentation for simulating drag-n-drops within iframes.
* Registers the plugin at plugins.jquery.com.


Version 1.1.3 - (Released: 2013-01-17)
-------------
* Updates the jQuery package manifest file.


Version 1.1.2 - (Released: 2012-10-11)
-------------
* The build script now produces two dist versions: the "normal" version contains the jQuery simulate
extended plugins and the "complete" version also includes jQuery simulate.


Version 1.1.1 - (Released: 2012-10-08)
-------------
* Adds grunt.js build system.
* Source code cleanup.


Version 1.1 - (Released: 2012-09-12)
-----------
#### `drag-n-drop` ####
* Adds support for simulation of drag-n-drop within child-iframes
* `mousemove` events are now triggered on the element at the position of the event instead of
	the dragged element (for exceptions, see [doc/drag-n-drop.md#events](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/drag-n-drop.md#events))