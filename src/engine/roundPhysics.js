/**
 * Constructs a RoundPhysics context instance. This context handles
 * creation of bodies and behaviors, and frame logic.
 *
 * @constructor
 * @param {String} bgColor - the background color for the canvas
 * @return {RoundPhysics} |this| RoundPhysics context
 */
function RoundPhysics(bgColor) {
   this.bodies = [];
   this.integrator = new Tcv();
   this.canvasHandler = new CanvasHandler(bgColor);
   this.progress = 0;
   this.dtPrev = 0;
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
 * Changes the background color on the canvas of |this| RoundPhysics context.
 *
 * @param {String} bgColor - the background color
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.changeBgColor = function(bgColor) {
   canvasHandler.changeBgColor(bgColor);

   return this;
}

/**
 * Creates a new |body| in |this| RoundPhysics context.
 *
 * @param {Body} body - the new body to add
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.addBody = function(body) {
   this.bodies.push(body);

   return this;
}

/**
 * Deletes up to one body equal to |body| from |this| RoundPhysics context.
 * If |body| does not exist in bodies, this method does nothing.
 *
 * @param {Body} body - the equivalent body to remove
 * @return {RoundPhysics} |this| RoundPhysics context
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
 * Starts the engine.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.start = function() {
   this.progress = new Date().getTime();
   window.requestAnimFrame(this.frame.bind(this));

   return this;
}

/**
 * Executes upon every frame.
 * Applies designated behaviors to all bodies,
 * integrates the motion of all bodies,
 * and finally draws them.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.frame = function(timestamp) {
   this.dtPrev = this.dt;
   this.dt = (timestamp - this.progress) / 1000;
   this.progress = timestamp;

   this.bodies.forEach(function(body) {
      body.applyBehaviors();
   }, this);

   this.integrator.integrate(this.bodies, this.dtPrev, this.dt);
   this.canvasHandler.draw(this.bodies);

   window.requestAnimFrame(this.frame.bind(this));

   return this;
}
