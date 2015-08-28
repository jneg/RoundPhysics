/**
 * @module Vec2
 * @version 0.0.2
 * @author Javon Negahban
 *
 * @description Vec2 is a vector object which holds an x and y property
 * resembling the x and y axes on a cartesian plane.
 *
 * Vec2(x, y)
 * Vec2.prototype.toString()
 * Vec2.prototype.equals(v)
 * Vec2.prototype.length()
 * Vec2.prototype.angle()
 * Vec2.prototype.normalize()
 * Vec2.prototype.add(v)
 * Vec2.prototype.sub(v)
 * Vec2.prototype.scale(factor)
 * Vec2.prototype.mutableSet(v)
 * Vec2.prototype.mutableAdd(v)
 * Vec2.prototype.mutableSub(v)
 * Vec2.prototype.mutableScale(factor)
 * Vec2.prototype.mutableRotate(angle)
 */

/**
 * @constructor
 * @param {Number} x - the x property of the vector
 * @param {Number} y - the y property of the vector
 * @return {Vec2} |this| vector instance
 *
 * @description Constructs a vector instance with an |x| and |y| property.
 */
function Vec2(x, y) {
   this.x = x || 0;
   this.y = y || 0;
}

/**
 * @method toString
 * @return {String} the string representation of |this| vector instance
 *
 * @description Returns the string representation of |this| vector instance.
 */
Vec2.prototype.toString = function() {
   return '{Vec2} x: ' + this.x + ', y: ' + this.y;
}

/**
 * @method equals
 * @param {Vec2} v - the vector to compare with |this|
 * @return {Boolean} true if |this| equals |v|, otherwise false
 *
 * @description Returns true if |this| equals |v|, otherwise false. Two
 * vectors are equal if both their x and y properties are equal.
 */
Vec2.prototype.equals = function(v) {
   return this.x === v.x && this.y === v.y;
}

/**
 * @method length
 * @return {Number} length of |this| vector instance
 *
 * @description Returns the length of |this| vector.
 */
Vec2.prototype.length = function() {
   return Math.sqrt(this.x * this.x + this.y * this.y);
}

/**
 * @method angle
 * @return {Number} angle in radians
 *
 * @description Returns the angle of |this| vector.
 */
Vec2.prototype.angle = function() {
   return Math.atan2(this.y, this.x)
}

/**
 * @method normalize
 * @return {Vec2} the normalized vector
 *
 * @description Returns the normalized vector of |this|.
 */
Vec2.prototype.normalize = function() {
   if (this.equals(new Vec2(0, 0))) {
      return new Vec2(0, 0);
   }

   return new Vec2().mutableSet(this).mutableScale(1 / this.length());
}

/** 
 * @method add
 * @param {Vec2} v - the vector to add to |this|
 * @return {Vec2} the summation vector
 *
 * @description Returns the summation vector of |this| and |v|.
 */
Vec2.prototype.add = function(v) {
   return new Vec2(this.x + v.x, this.y + v.y);
}

/** 
 * @method sub
 * @param {Vec2} v - the vector to add to |this|
 * @return {Vec2} the difference vector
 *
 * @description Returns the difference vector of |this| and |v|.
 */
Vec2.prototype.sub = function(v) {
   return new Vec2(this.x - v.x, this.y - v.y);
}

/** 
 * @method scale
 * @param {Number} factor - the coefficient to multiply |this| by
 * @return {Vec2} the scaled vector
 *
 * @description Returns the scale vector of |this| scaled by |factor|.
 */
Vec2.prototype.scale = function(factor) {
   return new Vec2(this.x * factor, this.y * factor);
}

/**
 * @method mutableSet
 * @param {Vec2} v - the vector to set |this| to
 * @return {Vec2} |this| vector instance
 *
 * @description Sets |this| to |v|.
 */
Vec2.prototype.mutableSet = function(v) {
   this.x = v.x;
   this.y = v.y;

   return this;
}

/** 
 * @method mutableAdd
 * @param {Vec2} v - the vector to add to |this|
 * @return {Vec2} |this| vector instance
 *
 * @description Adds |v| to |this| and returns |this|.
 */
Vec2.prototype.mutableAdd = function(v) {
   this.x += v.x;
   this.y += v.y;

   return this;
}

/** 
 * @method mutableSub
 * @param {Vec2} v - the vector to subtract from |this|
 * @return {Vec2} |this| vector instance
 *
 * @description Subtracts |v| from |this| and returns |this|.
 */
Vec2.prototype.mutableSub = function(v) {
   this.x -= v.x;
   this.y -= v.y;

   return this;
}

/** 
 * @method mutableScale
 * @param {Number} factor - the coefficient to multiply |this| by
 * @return {Vec2} |this| vector instance
 *
 * @description Scales |this| by |factor| and returns |this|.
 */
Vec2.prototype.mutableScale = function(factor) {
   this.x *= factor;
   this.y *= factor;

   return this;
}

/**
 * @method mutableRotate
 * @param {Number} angle - angle in radians to rotate |this| vector
 * @return {Vec2} |this| vector instance
 *
 * @description Rotates |this| vector by |angle|.
 */
Vec2.prototype.mutableRotate = function(angle) {
   var cs = Math.cos(angle);
   var sn = Math.sin(angle);
   var xNew = this.x * cs - this.y * sn;
   var yNew = this.x * sn + this.y * cs;

   this.x = xNew;
   this.y = yNew;

   return this;
}
