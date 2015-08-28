/**
 * @module ConstantForce
 * @version 0.0.2
 * @author Javon Negahban
 *
 * @description A ConstantForce instance is a behavior which applies a
 * constant force to its applied body.
 *
 * ConstantForce(force)
 * ConstantForce.prototype.toString()
 * ConstantForce.prototype.apply(body, dt)
 */

/**
 * @constructor
 * @param {Vec2} force - the force to apply
 * @return {ConstantForce} |this| ConstantForce instance
 *
 * @description Constructs and returns a ConstantForce instance.
 */
function ConstantForce(force) {
   this.force = force;
}

/**
 * @method toString
 * @return {String} string representation of |this| ConstantForce instance
 *
 * @description Returns the string representation of |this| ConstantForce instance.
 */
ConstantForce.prototype.toString = function() {
   return '{ConstantForce} force: ' + this.force;
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
   body.applyForce(this.force);

   return this;
}
