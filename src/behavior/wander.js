/**
 * Creates and returns a Wander instance.
 * A Wander instance is a behavior which makes its applied
 * body roam with constant velocity in random rotation based
 * on the degree of |insanity| and the force of |strength|.
 *
 * @constructor
 * @param {Number} insanity - the degree of rotation between (0, 2 PI)
 * @param {Number} strength - the force of wander
 * @return {Wander} |this| Wander instance
 */
function Wander(insanity, strength) {
   this.insanity = insanity
   this.strength = strength;
   this.angle = Math.random() * 2 * Math.PI;
}

/**
 * Apply |this| Wander behavior onto |body|.
 *
 * @param {Body} body - the body to apply behavior to
 * @return {Wander} |this| Wander instance
 */
Wander.prototype.apply = function(body) {
   var unitPrev = new Vec2(1, 0).mutableAngle(this.angle);
   this.angle += (Math.random() - 0.5) * this.insanity;
   var unitNew = new Vec2(1, 0).mutableAngle(this.angle);

   body.applyForce(unitPrev.scale(-1 * this.strength));
   body.applyForce(unitNew.scale(this.strength));
}

/**
 * Returns the string representation of |this|.
 *
 * @return {String} string representation of |this|
 */
Wander.prototype.toString = function() {
   return '{Wander} insanity: ' + this.insanity + ', strength: '
    + this.strength;
}
