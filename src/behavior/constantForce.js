/**
 * @module ConstantForce
 * @version 1.0.2
 * @author Javon Negahban
 *
 * @description A ConstantForce instance is a behavior which applies a
 * constant force to its applied body.
 *
 * ConstantForce(forceCb)
 * ConstantForce.prototype.toString()
 * ConstantForce.prototype.apply(body, dt)
 */

/**
 * @constructor
 * @param {Function} forceCb - the function that returns the force Vec2
 * to apply to the body
 * @return {ConstantForce} |this| ConstantForce instance
 *
 * @description Constructs and returns a ConstantForce instance.
 */
function ConstantForce(forceCb) {
   this.forceCb = forceCb;
}

/**
 * @method toString
 * @return {String} string representation of |this| ConstantForce instance
 *
 * @description Returns the string representation of |this| ConstantForce
 * instance.
 */
ConstantForce.prototype.toString = function() {
   return '{ConstantForce} forceCb: ' + this.forceCb;
}

/**
 * @method apply
 * @param {Body} body - the body to apply ConstantForce to
 * @param {Number} dt - the change in time
 * @return {ConstantForce} |this| ConstantForce instance
 *
 * @description Apply |this| ConstantForce behavior onto |body|.
 */
ConstantForce.prototype.apply = function(body, dt) {
   body.applyForce(this.forceCb());

   return this;
}
