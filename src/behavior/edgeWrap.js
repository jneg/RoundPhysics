/**
 * @module EdgeWrap
 * @version 0.0.1
 * @author Javon Negahban
 *
 * @description An EdgeWrap instance is a behavior which makes its applied
 * body wrap around to the opposite edge of the canvas when leaving it.
 *
 * EdgeWrap.prototype.toString()
 * EdgeWrap.prototype.apply(body, dt)
 */

/**
 * @constructor
 * @return {EdgeWrap} |this| EdgeWrap instance
 *
 * @description Constructs and returns an EdgeWrap instance.
 */
function EdgeWrap() {}

/**
 * @method toString
 * @return {String} string representation of |this| EdgeWrap instance
 *
 * @description Returns the string representation of |this| EdgeWrap instance.
 */
EdgeWrap.prototype.toString = function() {
   return '{EdgeWrap}';
}

/**
 * @method apply
 * @param {Body} body - the body to apply EdgeWrap to
 * @param {Number} dt - the change in time
 * @return {EdgeWrap} |this| EdgeWrap instance
 *
 * @description Apply |this| EdgeWrap behavior onto |body|.
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
