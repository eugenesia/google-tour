/**
 * Functional object for animation.
 */
function Animator() {

	// Provide binding in anonymous functions.
	var self = this;
	// Interval in ms between each animation loop.
	var intervalRate = 20;
	this.tweenTypes = {
		// % of total distance to move per frame, total = 100.
		// Each tween type has a different number of frames, so we need to scale the
		// delta for each frame accordingly.
		'default': [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1],
		'blast': [12,12,11,10,10,9,8,7,6,5,4,3,2,1],
		'linear': [10,10,10,10,10,10,10,10,10,10],
	}

	// Queue of objects to be animated.
	this.queue = [];
	this.queueHash = [];
	this.active = false;
	this.timer = null;

	// Tween will be an array e.g. 
	// [{data: 5}, {data: 7}, {data: 9}, {data: 15}]...
	this.createTween = function(start, end, type) {

		// Return array of tween coord data (start->end)
		type = type || 'default';
		var tween = [start];
		// Variable to store the y-axis value.
		var tmp = start;
		var diff = end - start;

		// No. of frames.
		var x = self.tweenTypes[type].length;
		
		// i will go from 0 to number of frames, just like an x-axis value.
		for (var i=0; i<x; i++) {

			// Calc y-value by incrementing it with the diff for each frame.
			tmp += diff * self.tweenTypes[type][i] * 0.01;
			tween[i] = {};
			tween[i].data = tmp;
			tween[i].event = null;
		}
		return tween;
	};

	// Add object and associated methods to animation queue
	// o: object to be added.
	this.enqueue = function(o, fMethod, fOnComplete) {
		// console.log('animator.enqueue()');
		if (! fMethod) {
			// console.log('animator.enqueue(): missing fMethod');
		}
		self.queue.push(o);
		o.active = true;
	};

	// Interval-driven loop: process queue, stop if done.
	// This is run once every interval.
	this.animate = function() {

		var active = 0;
		for (var i=0; j=self.queue.length, i<j; i++) {

			// Animate each animation object individually.
			if (self.queue[i].active) {
				self.queue[i].animate();
				active++;
			}
		}

		if (active == 0 && self.timer) {
			// All animations finished.
			console.log('Animations complete');
			self.stop();
		} else {
			console.log(active + ' animations active');
		}
	};

	this.start = function() {

		// Do nothing if animator already active.
		if (self.timer || self.active) {
			console.log('animator.start(): already active');
			return false;
		}

		console.log('animator.start()');
		// Report only if started.
		self.active = true;
		self.timer = setInterval(self.animate, intervalRate);
	};
	
	this.stop = function() {
		console.log('animator.stop()', true);
		// Reset some things, clear for next batch of animations.
		clearInterval(self.timer);
		self.timer = null;
		self.active = false;
		self.queue = [];
	};

};


var animator = new Animator();


/**
 * This is an individual animation sequence.
 */
function Animation(oParams) {
	/*
		oParams = {
			from: 200,
			to: 300,
			tweenType: 'default' // see animator.tweenTypes (optional)
			ontween: function(value) { ... }, // method called each time (required)
			oncomplete: function() { ... } // when finished (optional)
		}
	*/

	// Pass this to anon functions due to loss of binding.
	var self = this;
	if (typeof oParams.tweenType == 'undefined') {
		oParams.tweenType = 'default';
	}
	
	this.ontween = (oParams.ontween || null);
	this.oncomplete = (oParams.oncomplete || null);
	this.tween = animator.createTween(oParams.from, oParams.to, oParams.tweenType);
	this.frameCount = animator.tweenTypes[oParams.tweenType].length;
	this.frame = 0;
	this.active = false;

	this.animate = function() {
		// Generic animation method
		if (self.active) {

			if (self.ontween && self.tween[self.frame]) {
				// data: y-value.
				self.ontween(self.tween[self.frame].data);
			}

			if (self.frame++ >= self.frameCount-1) {
				console.log('animation(): end');

				self.active = false;
				self.frame = 0;

				if (self.oncomplete) {
					self.oncomplete();
				}
				// Finished as destination reached.
				return false;
			}
			// Still animating, not completed.
			return true;

		} else {
			// Not running as inactive.
			return false;
		}
	};

	this.start = function() {
		// Add this to the main animation queue.
		animator.enqueue(self, self.animate, self.oncomplete);
		if (! animator.active) {
			animator.start();
		}
	};

	this.stop = function() {
		self.active = false;
	};
};

