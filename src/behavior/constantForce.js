/**
 * Creates and returns a ConstantForce instance.
 * A ConstantForce instance is a behavior which applies a constant
 * force to its applied body.
 *
 * @constructor
 * @param {Vec2} force - the force to apply
 * @return {ConstantForce} |this| ConstantForce instance
 */
function ConstantForce(force) {
   this.force = force;
}

/**
 * Apply |this| ConstantForce behavior onto |body|.
 *
 * @param {Body} body - the body to apply Wander to
 * @param {Number} dt - the change in time
 * @return {ConstantForce} |this| ConstantForce instance
 */
ConstantForce.prototype.apply = function(body, dt) {
   body.applyForce(this.force);
}

/**
 * Returns the string representation of |this| ConstantForce instance.
 *
 * @return {String} string representation of |this| ConstantForce instance
 */
ConstantForce.prototype.toString = function() {
   return '{ConstantForce} force: ' + this.force;
}
