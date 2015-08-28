/**
 * @module RoundPhysics
 * @version 0.1.0
 * @author Javon Negahban
 *
 * @description RoundPhysics is an engine context which handles creation
 * of bodies, the integrator, and the canvasHandler.
 * The context is in charge of frame logic and managing these utilities
 * to demonstrate a physics engine.
 *
 * RoundPhysics.prototype.toString()
 * RoundPhysics.prototype.changeBgColor(bgColor)
 * RoundPhysics.prototype.getMouse()
 * RoundPhysics.prototype.addBody(body)
 * RoundPhysics.prototype.delBody(body)
 * RoundPhysics.prototype.start()
 * RoundPhysics.prototype.frame()
 */

/**
 * @constructor
 * @param {String} bgColor - the background color for the canvas
 * @return {RoundPhysics} |this| RoundPhysics context
 *
 * @description Constructs a RoundPhysics context instance. This context
 * handles creation of bodies, the integrator, and the canvasHandler.
 * In addition, it does frame logic to coordinate all the modules
 * of the library.
 */
function RoundPhysics(bgColor) {
   this.bodies = [];
   this.integrator = new ImprovedEuler();
   this.canvasHandler = new CanvasHandler(bgColor);
   this.progress = 0;
   this.dt = 0;


   window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
       window.setTimeout(callback, 1000 / 60);
    };
}

/**
 * @method toString
 * @return {String} the string representation of |this| RoundPhysics context
 *
 * @description Returns the string representation of |this| RoundPhysics
 * context.
 */
RoundPhysics.prototype.toString = function() {
   return '{RoundPhysics} bodies: ' + this.bodies + ', integrator: '
    + this.integrator + ', canvasHandler: ' + this.canvasHandler
    + ', progress: ' + this.progress + ', dt: ' + this.dt;
}

/**
 * @method changeBgColor
 * @param {String} bgColor - the background color
 * @return {RoundPhysics} |this| RoundPhysics context
 *
 * @description Changes the background color on the canvas of |this|
 * RoundPhysics context.
 */
RoundPhysics.prototype.changeBgColor = function(bgColor) {
   this.canvasHandler.changeBgColor(bgColor);

   return this;
}

/**
 * @method getMouse
 * @return {Vec2} the mouse position vector on the canvas
 *
 * @description Returns the mouse position vector on the canvas of |this|
 * RoundPhysics context.
 */
RoundPhysics.prototype.getMouse = function() {
   return this.canvasHandler.getMouse();
}

/**
 * @method addBody
 * @param {Body} body - the new body to add
 * @return {RoundPhysics} |this| RoundPhysics context
 *
 * @description Creates a new |body| in |this| RoundPhysics context.
 */
RoundPhysics.prototype.addBody = function(body) {
   this.bodies.push(body);

   return this;
}

/**
 * @method delBody
 * @param {Body} body - the equivalent body to remove
 * @return {RoundPhysics} |this| RoundPhysics context
 *
 * @description Deletes up to one body equal to |body| from |this| RoundPhysics
 * context. If |body| does not exist in bodies, nothing is deleted.
 */
RoundPhysics.prototype.delBody = function(body) {
   this.bodies.some(function(b, index) {
      if (b.equals(body)) {
         this.bodies.splice(index, 1);

         return true;
      }
   }, this);

   return this;
}

/**
 * @method start
 * @return {RoundPhysics} |this| RoundPhysics context
 *
 * @description Starts the engine.
 */
RoundPhysics.prototype.start = function() {
   this.progress = new Date().getTime();
   window.requestAnimFrame(this.frame.bind(this));

   return this;
}

/**
 * @method frame
 * @return {RoundPhysics} |this| RoundPhysics context

 * @description Executes upon every frame.
 * Applies designated behaviors to all bodies,
 * integrates the motion of all bodies,
 * and finally draws them.
 */
RoundPhysics.prototype.frame = function(timestamp) {
   this.dt = (timestamp - this.progress) / 1000;
   this.progress = timestamp;

   this.bodies.forEach(function(body) {
      body.applyBehaviors(this.dt);
   }, this);

   this.integrator.integrate(this.bodies, this.dt);
   this.canvasHandler.draw(this.bodies);

   window.requestAnimFrame(this.frame.bind(this));

   return this;
}
