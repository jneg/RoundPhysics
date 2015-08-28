/**
 * @module Gravitation
 * @version 1.1.1
 * @author Javon Negahban
 *
 * @description A Gravitation instance is a behavior which applies
 * a gravitational force to the applied body. The gravitation's core
 * is at some position specified with some strength and radius. Gravitation
 * is applied according to Newton's Universal Law of Gravitation.
 * The force of gravitation is inversely proportional to the
 * distance between the core and the body, squared. The force of gravitation
 * is proportional to the strength. The radius specifies the minimum
 * distance required for the gravitational force to be applied.
 *
 * Gravitation(positionCb, strengthCb, radiusCb)
 * Gravitation.prototype.toString()
 * Gravitation.prototype.apply(body, dt)
 */

/**
 * @constructor
 * @param {Function} positionCb - the function that returns the position Vec2
 * of the core of gravitation
 * @param {Function} strengthCb - the function that returns the strength
 * Number of gravitation; the recommended strength is between [10, 500]
 * @param {Function} radiusCb - the function that returns the radius Number
 * where no gravitation is within it; the recommended radius is between [1, 200]
 * @return {Gravitation} |this| Gravitation instance
 *
 * @description Constructs and returns a Gravitation instance.
 */
function Gravitation(positionCb, strengthCb, radiusCb) {
   this.positionCb = positionCb;
   this.strengthCb = strengthCb;
   this.radiusCb = radiusCb;
}

/**
 * @method toString
 * @return {String} string representation of |this| Gravitation instance
 *
 * @description Returns the string representation of |this| Gravitation instance.
 */
Gravitation.prototype.toString = function() {
   return '{Gravitation} positionCb: ' + this.positionCb + ', strengthCb: '
    + this.strengthCb + ', radiusCb: ' + this.radiusCb;
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
   var pos = this.positionCb();
   var str = this.strengthCb();
   var rad = this.radiusCb();
   var dist = pos.sub(body.pos);
   var len = dist.length();
   var norm = dist.normalize();

   if (len > rad) {
      body.applyForce(norm.scale(100000 * str * body.mass / (len * len)));
   }

   return this;
}
