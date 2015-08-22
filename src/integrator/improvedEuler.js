/**
 * @module ImprovedEuler
 * @version 0.0.1
 * @author Javon Negahban
 *
 * @description ImprovedEuler is an integrator which integrates for position
 * first using initial velocity and initial acceleration, then integrates
 * final velocity for the timestep using initial acceleration.
 * pf = pi + vi * dt + 0.5 * ai * dt * dt
 * vf = vi + ai * dt
 *
 * ImprovedEuler.prototype.toString()
 * ImprovedEuler.prototype.integrate(bodies, dt)
 */

/**
 * @constructor
 * @return {ImprovedEuler} |this| ImprovedEuler instance
 *
 * @description Creates an ImprovedEuler integrator instance.
 */
function ImprovedEuler() {}

/**
 * @method toString
 * @return {String} string representation of |this| ImprovedEuler instance
 *
 * @description Returns the string representation of |this| ImprovedEuler
 * instance.
 */
ImprovedEuler.prototype.toString = function() {
   return '{ImprovedEuler}';
}

/**
 * @method integrate
 * @param {Body[]} bodies - the bodies to integrate
 * @param {Number} dt - the change in time
 * @return {ImprovedEuler} |this| ImprovedEuler instance
 *
 * @description Integrate the motion of |bodies| using the Improved Euler
 * integration method.
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
