/**
 * An animation object, which moves.
 * obj: Set a DOM object as the animObj.
 */
function animObj(obj) {
	this._obj = obj;

	this._x = obj.offsetLeft;
	this._y = obj.offsetTop;
}


/**
 * Set the position of the obj.
 */
animObj.prototype.setPos = function(pos) {
	this._x = pos.x;
	this._y = pos.y;
	
	this._obj.style.left = pos.x + 'px';
	this._obj.style.top = pos.y + 'px';
}


/**
 * Return current position.
 */
animObj.prototype.getPos = function() {
	return {
		x: this._x, 
		y: this._y
	}
}


/**
 * Set final position of move.
 */
animObj.prototype.setDest = function(pos) {
	this._destX = pos.x;
	this._destY = pos.y;

	// How much to increment the move each time.
	frames = 100;
	this._incrX = (pos.x - this._x) / frames;
	this._incrY = (pos.y - this._y) / frames;
}


/**
 * Move by one increment.
 */
animObj.prototype.doMove = function() {
	this.setPos({
		x: this._x + this._incrX,
		y: this._y + this._incrY
	});
}
