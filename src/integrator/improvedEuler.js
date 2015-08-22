/**
 * Create an ImprovedEuler integrator instance.
 *
 * @constructor
 * @return {ImprovedEuler} |this| ImprovedEuler instance
 */
function ImprovedEuler() {}

/**
 * Integrate |bodies| using the Improved Euler integration method.
 *
 * @param {Body[]} bodies - the bodies to integrate
 * @param {Number} dt - the change in time
 * @return {ImprovedEuler} |this| ImprovedEuler instance
 */
ImprovedEuler.prototype.integrate = function(bodies, dt) {
   if (dt > 0) {
      bodies.forEach(function(body) {
         body.pos.mutableAdd(body.vel.scale(dt))
         body.pos.mutableAdd(body.acc.scale(0.5 * dt * dt));
         body.vel.mutableAdd(body.acc.scale(dt));

         body.acc.mutableSet(new Vec2(0, 0));
      }, this);

      return this;
   }
}

/**
 * Returns the string representation of |this| ImprovedEuler integrator.
 *
 * @return {String} string representation of |this| ImprovedEuler integrator
 */
ImprovedEuler.prototype.toString = function() {
   return '{ImprovedEuler}';
}
