jQuery Simulate Extended Plugin 1.1.6
=====================================

The simulate extended plugin provides methods for simulating complex user interactions based on the
[jQuery.simulate.js](https://github.com/jquery/jquery-ui/blob/master/tests/jquery.simulate.js) plugin
from [jQuery UI](http://jqueryui.com).
The plugin provides simulation of:

* Drag & Drop
* Key Sequences
* Key Combinations

Additionally, the extended plugin includes documentation and fixes for the jQuery simulate plugin itself.

#### Table of Contents ####
- [Usage](#usage)
	- [Example](#example)
	- [Demos](#demos)
- [Documentation](#documentation)
- [Requirements](#requirements)
- [Compatibility](#compatibility)
- [Licensing](#licensing)


Usage
-----
To use the jQuery simulate extended plugins, include `jquery.simulate.js`, `jquery.simulate.ext.js`
and then the desired plugins (in that order).

The simulations are executed by calling the `.simulate()` function on a jQuery object. The simulation
is then executed on all elements in the collection of the jQuery object (unless otherwise noted).

- Synopsis: `.simulate(type, options)`
- Parameters:
	* __type__ _{String}_: The type of the interaction to be simulated.
	* __options__ _{Object}_: An option object containing the options for the action to be simulated.

The types of simulated actions are:

- From the simulate plugin:
	- Mouse Events: `"mousemove"`, `"mousedown"`, `"mouseup"`, `"click"`, `dblclick"`,
		`"mouseover"`, `"mouseout"`, `"mouseenter"`, `"mouseleave"`, `"contextmenu"`
	- Key Events: `"keydown"`, `"keyup"`, `"keypress"`
	- `"focus"`
	- `"blur"`
- From the simulate-ext plugins:
	- Drag & Drop: `"drag-n-drop"`, `"drag"`, `"drop"`
	- `"key-sequence"`
	- `"key-combo"`

#### Example: ####
```javascript
$('input[name="testInput"]').simulate("key-sequence", {sequence: "asdf"});
```

#### Demos: ####
The [demos folder](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/demo) contains a
demonstration of most of the features of the simulate extended plugins.

Live demos can be found at jsFiddle and JS Bin where you can also play around with the plugin:

- http://jsfiddle.net/Ignitor/Psjhf/embedded/result/ ([jsFiddle](http://jsfiddle.net/Ignitor/Psjhf/))
- http://jsbin.com/inalax/25/edit#live ([JS Bin](http://jsbin.com/inalax/25/edit))


Documentation
-------------
The options and events for the different interactions are described in the files in the [doc folder](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc):
* [Mouse Events](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/simulate.md)
* [Key Events](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/simulate.md)
* [Focus/Blur](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/simulate.md)
* [Drag & Drop](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/drag-n-drop.md)
* [Key Sequence](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/key-sequence.md)
* [Key Combination](https://github.com/j-ulrich/jquery-simulate-ext/tree/master/doc/key-combo.md)

Requirements
------------
The plugin requires
* [jQuery 1.7.0+](http://jquery.com)
* [jQuery Simulate](https://github.com/jquery/jquery-ui/blob/master/tests/jquery.simulate.js)
* [bililiteRange](http://bililite.com/blog/2011/01/17/cross-browser-text-ranges-and-selections) for
	the key-sequence and key-combo plugins

Compatibility
------------
The plugins have been successfully tested with jQuery 1.7.2 and [jQuery Simulate @485ca7192a](https://github.com/jquery/jquery-ui/blob/485ca7192ac57d018b8ce4f03e7dec6e694a53b7/tests/jquery.simulate.js).
However, they should be compatible with future versions.


Licensing
---------
Copyright &copy; 2012 Jochen Ulrich
https://github.com/j-ulrich/jquery-simulate-ext

Licensed under the [MIT license](http://opensource.org/licenses/MIT).

