/**
 * Constructs a Vec2 instance with an |x| and |y| property. Vec2 represents
 * a 2 dimensional vector.
 *
 * @constructor
 * @param {Number} x - the x property of the vector
 * @param {Number} y - the y property of the vector
 * @return {Vec2} |this| Vec2 instance
 */
function Vec2(x, y) {
   this.x = x || 0;
   this.y = y || 0;
}

/**
 * Returns the length of |this| vector.
 * 
 * @return {Number} length of |this| vector
 */
Vec2.prototype.length = function() {
   return Math.sqrt(this.x * this.x + this.y * this.y);
}

/**
 * Returns the angle in radians from the x-axis of |this| vector.
 * 
 * @return {Number} angle of the vector from the x-axis in radians
 */
Vec2.prototype.angle = function() {
   return Math.atan(this.y / this.x);
}

/**
 * Returns the coordinate-modified vector with the axis rotated
 * by |angle| in radians.
 * 
 * @param {Number} angle - angle in radians to rotate the axis
 * @return {Vec2} the coordinate-modified vector with the axis rotated
 */
Vec2.prototype.axis = function(angle) {
   return new Vector(this.x * Math.cos(angle) + this.y * Math.sin(angle),
    this.x * Math.sin(angle) + this.y * Math.cos(angle));
}

/**
 * Returns the summation vector of |this| and |v|.
 * 
 * @return {Vec2} the summation vector
 */
Vec2.prototype.add = function(v) {
   return new Vec2(this.x + v.x, this.y + v.y);
}

/**
 * Returns the difference vector of |this| and |v|.
 * 
 * @return {Vec2} the difference vector
 */
Vec2.prototype.sub = function(v) {
   return new Vec2(this.x - v.x, this.y - v.y);
}

/**
 * Returns the scale vector of |this| scaled by |factor|.
 * 
 * @return {Vec2} the scaled vector
 */
Vec2.prototype.scale = function(factor) {
   return new Vec2(this.x * factor, this.y * factor);
}

/**
 * Adds |v| to |this| and returns |this|.
 * 
 * @param {Vec2} v - the vector to add to |this|
 * @return {Vec2} |this| vector
 */
Vec2.prototype.mutableAdd = function(v) {
   this.x += v.x;
   this.y += v.y;

   return this;
}

/**
 * Subtracts |v| from |this| and returns |this|.
 * 
 * @param {Vec2} v - the vector to subtract from |this|
 * @return {Vec2} |this| vector
 */
Vec2.prototype.mutableSub = function(v) {
   this.x -= v.x;
   this.y -= v.y;

   return this;
}

/**
 * Scales |this| by |factor| and returns |this|.
 * 
 * @param {Number} factor - the coefficient to multiply |this| by
 * @return {Vec2} |this| vector
 */
Vec2.prototype.mustableScale = function(factor) {
   this.x *= factor;
   this.y *= factor;

   return this;
}
