/**
 * @module Wander
 * @version 0.0.1
 * @author Javon Negahban
 *
 * @description A Wander instance is a behavior which makes its applied
 * body roam with velocity in random direction based on the degree of
 * insanity: the amount of rotation, and the speed.
 *
 * Wander.prototype.toString()
 * Wander.prototype.apply(body, dt)
 */

/**
 * @constructor
 * @param {Number} insanity - the degree of rotation between (0, 2 PI)
 * @param {Number} speed - the speed of wander
 * @return {Wander} |this| Wander instance
 *
 * @description Constructs and returns a Wander instance.
 */
function Wander(insanity, speed) {
   this.insanity = insanity
   this.speed = speed;
   this.angle = Math.random() * 2 * Math.PI;
}

/**
 * @method toString
 * @return {String} string representation of |this| Wander instance
 *
 * @description Returns the string representation of |this| Wander instance.
 */
Wander.prototype.toString = function() {
   return '{Wander} insanity: ' + this.insanity + ', speed: ' + this.speed;
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
   var unitPrev = new Vec2(1, 0).mutableRotate(this.angle);
   this.angle += (Math.random() - 0.5) * this.insanity;
   var unitNew = new Vec2(1, 0).mutableRotate(this.angle);

   body.applyForce(unitPrev.scale(-1 * this.speed / dt));
   body.applyForce(unitNew.scale(this.speed / dt));

   return this;
}
