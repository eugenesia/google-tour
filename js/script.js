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


/**
 * Animate all boxes in list.
 */
function animateAll(animBoxes) {

	var timer = setInterval(animate, 0.000001);
	var animateTimes = 0;

	function animate() {
		for (var j=0; j<animBoxes.length; j++) {
			animBoxes[j].doMove();
		}
		animateTimes++;

		if (animateTimes > 100) {
			clearInterval(timer);
		}
	}
}

window.onload = function() {
	var boxes = document.getElementsByClassName('box');

	var boxWrapperWidth = 960;
	var boxWrapperHeight = 960;
	// Indicative box width just for initial positioning.
	var boxWidth = 200;

	// Boxes to be animated.
	var animBoxes = [];

	// Iterate thru boxes and set random positions.
	for (var i=0; i<boxes.length; i++) {
		
		var elemStyle = boxes[i].style;

		var toX = (boxWrapperWidth - boxWidth) * Math.random();
		var toY = (boxWrapperHeight - boxWidth) * Math.random();

		var box = new animObj(boxes[i]);
		box.setDest({x: toX, y: toY});

		animBoxes.push(box);
	}

	animateAll(animBoxes);
};

}(window));
