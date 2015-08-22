/**
 * Creates and returns an EdgeWrap instance.
 * An EdgeWrap instance is a behavior which makes its applied body
 * wrap around to the opposite edge of the canvas when leaving it.
 *
 * @constructor
 * @return {EdgeWrap} |this| EdgeWrap instance
 */
function EdgeWrap() {}

/**
 * Apply |this| EdgeWrap behavior onto |body|.
 *
 * @param {Body} body - the body to apply EdgeWrap to
 * @param {Number} dt - the change in time
 * @return {EdgeWrap} |this| EdgeWrap instance
 */
EdgeWrap.prototype.apply = function(body, dt) {
   if (body.pos.x + body.radius < 0) {
      body.pos.x = window.innerWidth + body.radius;
   } else if (body.pos.x - body.radius > window.innerWidth) {
      body.pos.x = -1 * body.radius;
   }

   if (body.pos.y + body.radius < 0) {
      body.pos.y = window.innerHeight + body.radius;
   } else if (body.pos.y - body.radius > window.innerHeight) {
      body.pos.y = -1 * body.radius;
   }

   return this;
}

/**
 * Returns the string representation of |this| EdgeWrap instance.
 *
 * @return {String} string representation of |this| EdgeWrap instance
 */
EdgeWrap.prototype.toString = function() {
   return '{EdgeWrap}';
}
