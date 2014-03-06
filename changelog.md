jquery-simulate-ext Changelog
=============================

Version 1.3.0 - (Released: 2014-03-07)
-------------
* Adds the `eventParams` option to allow custom data in the simulated events (see #12).
* Adds bower.json and registers the package at bower.
* Registers the package at npm.
* Corrects jQuery naming conventions ($varible).
* Updates demo to jQuery UI 1.10.3 to make it work with jQuery 1.10.2.
* Improves documentation here and there.
* Logs a warning message before running the test suite to warn about mouse movement during testing.
* Updated grunt file to grunt 0.4.x.
* __key-combo__: Adds support of special keys (`"left-arrow"`, etc.).
* __jquery.simulate.js__: Adds the `jQueryTrigger` option to use `jQuery.trigger()` instead of `disptachEvent()`.

Version 1.2.0 - (Released: 2013-09-03)
-------------
* Adds flag `jQuery.simulate.ext_disableQuirkDetection` to disable quirk detections.
* Allows enabling/disabling specific quirk fixes manually by settings the corresponding
  flag in the `jQuery.simulate.prototype.quirks` object.

Version 1.1.6 - (Released: 2013-08-15)
-------------
* Updates to the latest version of jquery.simulate.js to achieve compatibility with jQuery 1.9.x
  and above.
* Replaces libs/jquery-1.7.2.js with libs/jquery-1.10.2.js and updated demo accordingly.

Version 1.1.5 - (Released: 2013-05-22)
-------------
* Layout (CSS) improvements in the demo.
* __key-sequence__: Adds a workaround for the bug that spaces are moved to the end
  of the sequence when simulating on a non-input with delay on certain browsers
  (Webkit-based browsers).

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
* __drag-n-drop__: Adds support for simulation of drag-n-drop within child-iframes
* __drag-n-drop__: `mousemove` events are now triggered on the element at the position of the event instead of
	the dragged element (for exceptions, see [doc/drag-n-drop.md#events](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/drag-n-drop.md#events))