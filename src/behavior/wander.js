/**
 * @module Wander
 * @version 1.0.2
 * @author Javon Negahban
 *
 * @description A Wander instance is a behavior which makes its applied
 * body roam with some speed in random direction based on the degree of
 * insanity and the speed. The degree of insanity specifies the propensity
 * for the body to rotate more freely.
 *
 * Wander(insanityCb, speedCb)
 * Wander.prototype.toString()
 * Wander.prototype.apply(body, dt)
 */

/**
 * @constructor
 * @param {Function} insanityCb - the function that returns the degree of
 * rotation Number in radians; the recommended degree is between [0, 2 PI)
 * @param {Function} speedCb - the function that returns the speed Number
 * of wander
 * @return {Wander} |this| Wander instance
 *
 * @description Constructs and returns a Wander instance.
 */
function Wander(insanityCb, speedCb) {
   this.insanityCb = insanityCb
   this.speedCb = speedCb;
   this.angle = Math.random() * 2 * Math.PI;
}

/**
 * @method toString
 * @return {String} string representation of |this| Wander instance
 *
 * @description Returns the string representation of |this| Wander instance.
 */
Wander.prototype.toString = function() {
   return '{Wander} insanityCb: ' + this.insanityCb + ', speedCb: '
    + this.speedCb;
}

/**
 * @method apply
 * @param {Body} body - the body to apply Wander to
 * @param {Number} dt - the change in time
 * @return {Wander} |this| Wander instance
 *
 * @description Apply |this| Wander behavior onto |body|.
 */
Wander.prototype.apply = function(body, dt) {
   var insanity = this.insanityCb();
   var speed = this.speedCb();
   var unitPrev = new Vec2(1, 0).mutableRotate(this.angle);
   this.angle += (Math.random() - 0.5) * insanity;
   var unitNew = new Vec2(1, 0).mutableRotate(this.angle);

   body.applyForce(unitPrev.scale(-1 * speed / dt));
   body.applyForce(unitNew.scale(speed / dt));

   return this;
}
