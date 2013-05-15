/**
 * Script file.
 * Copyright 2013, Eugene Sia
 * s i a e u g e n e [at] g m a i l [dot] c o m
 */

/**
 * Plan: 
 * Build a selector library.
 * Research into animation.
 * Build an animation library.
 * Use selectors to animate.
 */

// Anonymous closure, prevents collisions.
(function(window, undefined) {

window.onload = function() {
	var boxes = document.getElementsByClassName('box');

	var boxWrapperWidth = 960;
	var boxWrapperHeight = 960;

	// Iterate thru boxes and set random positions.
	for (var i=0; i<boxes.length; i++) {
		
		var elemStyle = boxes[i].style;

		var left = boxWrapperWidth * Math.random();
		elemStyle.left = left + 'px';

		var right = boxWrapperHeight * Math.random();
		elemStyle.top = right + 'px';
	}
};

}(window));
