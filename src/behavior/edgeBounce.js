/**
 * Creates and returns an EdgeBounce instance.
 * An EdgeBounce instance is a behavior which makes its applied body
 * bounce from the edge of the canvas when colliding with it.
 *
 * @constructor
 * @return {EdgeBounce} |this| EdgeBounce instance
 */
function EdgeBounce() {}

/**
 * Apply |this| EdgeBounce behavior onto |body|.
 *
 * @param {Body} body - the body to apply EdgeBounce to
 * @param {Number} dt - the change in time
 * @return {EdgeBounce} |this| EdgeBounce instance
 */
EdgeBounce.prototype.apply = function(body, dt) {
   if (body.pos.x - body.radius < -.1) {
      body.pos.x = body.radius;
      body.applyForce(new Vec2(-2 * body.mass * body.vel.x / dt, 0));
   } else if (body.pos.x + body.radius > window.innerWidth + .1) {
      body.pos.x = window.innerWidth - body.radius;
      body.applyForce(new Vec2(-2 * body.mass * body.vel.x / dt, 0));
   }

   if (body.pos.y - body.radius < -.1) {
      body.pos.y = body.radius;
      body.applyForce(new Vec2(0, -2 * body.mass * body.vel.y / dt));
   } else if (body.pos.y + body.radius > window.innerHeight + .1) {
      body.pos.y = window.innerHeight - body.radius;
      body.applyForce(new Vec2(0, -2 * body.mass * body.vel.y / dt));
   }

   return this;
}

/**
 * Returns the string representation of |this| EdgeBounce instance.
 *
 * @return {String} string representation of |this| EdgeBounce instance
 */
EdgeBounce.prototype.toString = function() {
   return '{EdgeBounce}';
}
