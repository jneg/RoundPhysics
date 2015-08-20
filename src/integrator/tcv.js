/**
 * Create a time-corrected verlet integrator instance.
 *
 * @constructor
 * @return {Tcv} |this| Tcv instance
 */
function Tcv() {}

/**
 * Integrate |bodies| using time-corrected verlet integration
 * and the previous and current changes in time.
 *
 * @param {Body[]} bodies - the bodies to integrate
 * @param {Number} dtPrev - the previous change in time
 * @param {Number} dt - the current change in time
 * @return {Tcv} |this| Tcv instance
 */
Tcv.prototype.integrate = function(bodies, dtPrev, dt) {
   if (dtPrev > 0 && dt > 0) {
      bodies.forEach(function(body) {
         var posNext = body.pos
          .add(body.pos.sub(body.posPrev).scale(dt / dtPrev)
          .add(body.accPrev.scale(0.5 * dtPrev * dt)
          .add(body.acc.scale(0.5 * dt * dt))));

         body.posPrev = body.pos;
         body.pos = posNext;

         body.accPrev = body.acc;
         body.acc = new Vec2(0, 0);
      }, this);

      return this;
   }
}
