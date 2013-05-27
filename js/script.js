/**
 * Script file.
 * Copyright 2013, Eugene Sia
 * siaeugene [at] g m a i l [dot] c o m
 */

/**
 * Randomise positions of object array.
 */
function randomisePositions(rObj) {
	for (var i=0; i<rObj.length; i++) {
		rObj[i].style.left = Math.random() * 100 + '%';
		rObj[i].style.top = Math.random() * 100 + '%';
	}
}

/**
 * Set all objects to a classname.
 * timeout: Whether to do this after a timeout in ms.
 */
function objectsSetClass(obj, className, timeout) {
	if (typeof timeout == 'undefined') {
		timeout = 0;
	}
	setTimeout(function(){

		if (obj instanceof Array) {

			for (var i=0; i<obj.length; i++) {
				rObj[i].className = className;
			}

		} else {
			obj.className = className;
		}
	}, timeout);
}

// Anonymous closure, prevents collisions.
(function(window, document, undefined) {


	window.onload = function() {

		var delays = [0, 1000, 3000];


		var boxContainer = document.getElementsByClassName('box-container')[0];
		var boxes = document.getElementsByClassName('box-wrapper');
		
		boxContainer.className = 'box-container anim-0';

		for (var i=1; i<delays.length; i++) {
			objectsSetClass(boxContainer, 'box-container anim-' + i, delays[i]);
		}
	};

}(window, document));
