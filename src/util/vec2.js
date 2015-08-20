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
 * Returns the string representation of |this| Vec2.
 *
 * @return {String} the string representation of |this| Vec2
 */
Vec2.prototype.toString = function() {
   return '{Vec2} x: ' + this.x + ', y: ' + this.y;
}

/**
 * Returns true if |this| equals |v|, otherwise false.
 * Two vectors are equal if their x and y properties are equal.
 *
 * @param {Vec2} v - the vector to compare with |this|
 * @return {Boolean} true if |this| equals |v|, otherwise false
 */
Vec2.prototype.equals = function(v) {
   return this.x === v.x && this.y === v.y;
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
 * Returns the angle of |this| vector.
 *
 * @return {Number} angle in radians
 */
Vec2.prototype.angle = function() {
   return Math.atan2(this.y, this.x)
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
 * Returns the normalized vector of |this|.
 *
 * @return {Vec2} the normalized vector
 */
Vec2.prototype.normalize = function() {
   if (this.equals(new Vec2(0, 0))) {
      return new Vec2(0, 0);
   }

   return new Vec2().mutableSet(this).mutableScale(1 / this.length());
}

/**
 * Sets |this| to |v|.
 *
 * @param {Vec2} v - the vector to set |this| to
 * @return {Vec2} |this| vector
 */
Vec2.prototype.mutableSet = function(v) {
   this.x = v.x;
   this.y = v.y;

   return this;
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
Vec2.prototype.mutableScale = function(factor) {
   this.x *= factor;
   this.y *= factor;

   return this;
}

/**
 * Rotates |this| vector by |angle|.
 *
 * @param {Number} angle in radians to rotate |this| vector
 * @return {Vec2} |this| vector
 */
Vec2.prototype.mutableAngle = function(angle) {
   var cs = Math.cos(angle);
   var sn = Math.sin(angle);
   var px = this.x * cs - this.y * sn;
   var py = this.x * sn + this.y * cs;

   this.x = px;
   this.y = py;

   return this;
}
