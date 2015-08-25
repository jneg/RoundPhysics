/**
 * @module Gravitation
 * @version 0.0.1
 * @author Javon Negahban
 *
 * @description A Gravitation instance is a behavior which applies
 * a gravitational force to the applied body. The gravitation's core
 * is at some position specified with some strength. Gravitation is
 * applied proportional to Newton's Universal Law of Gravitation. That
 * is, the strength of gravitation is inversely proportional to the
 * distance between the core and the body, squared. The radius specifies
 * the minimum distance required for the gravitational force to be applied.
 *
 * Gravitation.prototype.toString()
 * Gravitation.prototype.apply(body, dt)
 */

/**
 * @constructor
 * @param {Vec2} position - the position of the core of gravitation
 * @param {Number} strength - the strength of gravitation
 * @param {Number} radius - the radius of no gravitation
 * @return {Gravitation} |this| Gravitation instance
 *
 * @description Constructs and returns a Gravitation instance.
 */
function Gravitation(position, strength, radius) {
   this.position = position;
   this.strength = strength;
   this.radius = radius;
}

/**
 * @method toString
 * @return {String} string representation of |this| Gravitation instance
 *
 * @description Returns the string representation of |this| Gravitation instance.
 */
Gravitation.prototype.toString = function() {
   return '{Gravitation} position: ' + this.position + ', strength: '
    + this.strength + ', radius: ' + this.radius;
}

/**
 * @method apply
 * @param {Body} body - the body to apply Gravitation to
 * @param {Number} dt - the change in time
 * @return {Gravitation} |this| Gravitation instance
 *
 * @description Apply |this| Gravitation behavior onto |body|.
 */
Gravitation.prototype.apply = function(body, dt) {
   var dist = this.position.sub(body.pos);
   var len = dist.length();
   var norm = dist.normalize();

   if (len > this.radius) {
      body.applyForce(norm.scale(100000 * this.strength * body.mass
       / (len * len)));
   }

   return this;
}
