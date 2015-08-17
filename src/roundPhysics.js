/**
 * Constructs a RoundPhysics context instance. This context attaches
 * to the canvas provided to animate and register mouse events on.
 * The context takes two vectors: gravity and wind for environmental
 * impulses on the particles.
 *
 * @param {HTMLCanvasElement} canvas - the canvas to animate and register
 * mouse events on
 * @param {Vec2} gravity - the gravity vector to apply to the environment
 * @param {Vec2} wind - the wind velocity vector to apply to the environment
 * @return {RoundPhysics} |this| RoundPhysics context
 */
function RoundPhysics(canvas, gravity, wind) {
   this.canvas = canvas;
   this.viewport = this.canvas.getBoundingClientRect();
   this.context = this.canvas.getContext('2d');
   this.gravity = gravity;
   this.wind = wind;
   this.dragFriction = 0.02;
   this.energyRetained = 0.6;
   this.dt = 0;
   this.prev = 0;
   this.mouse = new Vec2(0, 0);
   this.grabbedParticle = null;
   this.particles = [];

   this.setAnimFrame();

   this.canvas.addEventListener('contextmenu', function(e) {
      e.preventDefault();
   });

   this.canvas.addEventListener('mousemove', (function(e) {
      this.mouse = new Vec2(e.clientX - this.viewport.left,
       e.clientY - this.viewport.top);
   }).bind(this));

   this.canvas.addEventListener('mousedown', (function(e) {
      this.particles = this.particles.sort((function(ptcl1, ptcl2) {
         var ptcl1Dist = ptcl1.pos.sub(this.mouse).length();
         var ptcl2Dist = ptcl2.pos.sub(this.mouse).length();

         if (ptcl1Dist < ptcl2Dist) {
            return -1;
         }

         if (ptcl1Dist > ptcl2Dist) {
            return 1;
         }

         return 0;
      }).bind(this));

      this.particles.some(function(particle) {
         if (particle.contains(this.mouse)) {
            this.grabbedParticle = particle;
            return true;
         }
      }, this);
   }).bind(this));

   this.canvas.addEventListener('mouseup', (function(e) {
      this.grabbedParticle = null;
   }).bind(this));

   this.canvas.addEventListener('mouseleave', (function(e) {
      this.grabbedParticle = null;
   }).bind(this));
}

/**
 * Make window.requestAnimFrame cross-browser supported by setting it
 * equal to the supported frame function or defaulting to window.setTimeout.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.setAnimFrame = function() {
   window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
       window.setTimeout(callback, 1000 / 60);
    };

   return this;
}

/**
 * Adds |particle| to |this| RoundPhysics context. This creates a new
 * particle on the canvas for the context to interact with.
 *
 * @param {Particle} particle - the new particle to add
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.addParticle = function(particle) {
   this.particles.push(particle);

   return this;
}

/**
 * Bounces all particles out of bounds back into bounds by changing
 * their velocities and positions.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.boundsChecking = function() {
   this.particles.forEach(function(particle) {
      if (particle.pos.y + particle.radius > this.canvas.height) {
         particle.pos.y = this.canvas.height - particle.radius;
         particle.vel.y *= -1 * Math.sqrt(this.energyRetained);
      }

      if (particle.pos.x + particle.radius > this.canvas.width) {
         particle.pos.x = this.canvas.width - particle.radius;
         particle.vel.x *= -1 * Math.sqrt(this.energyRetained);
      }

      if (particle.pos.x - particle.radius < 0) {
         particle.pos.x = particle.radius;
         particle.vel.x *= -1 * Math.sqrt(this.energyRetained);
      }
   }, this);

   return this;
}

/**
 * Applies a gravitational impulse to all particles.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.applyGravity = function() {
   if (this.gravity) {
      this.particles.forEach(function(particle) {
         particle.applyImpulse(this.gravity.scale(particle.mass * this.dt));
      }, this);
   }

   return this;
}

/**
 * Applies a wind impulse to all particles.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.applyWind = function() {
   if (this.wind) {
      this.particles.forEach(function(particle) {
         particle.applyImpulse(particle.dragForce(this.wind,
          this.dragFriction).scale(this.dt));
      }, this);
   }

   return this;
}

/**
 * Checks if there is a particle selected by the mouse, and if so
 * change that particle's position to that of the mouse to provide
 * a dragging effect.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.applyMouse = function() {
   if (this.grabbedParticle !== null) {
      this.grabbedParticle.pos = new Vec2(this.mouse.x, this.mouse.y);
      this.grabbedParticle.vel = new Vec2(0, 0);
   }

   return this;
}

/**
 * Updates the positions of all particles based on their velocities.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.updatePositions = function() {
   this.particles.forEach(function(particle) {
      particle.updatePosition(this.dt);
   }, this)

   return this;
}

/**
 * Clears the canvas with the passed in background color and draws
 * all particles onto the canvas.
 *
 * @param {String} bgColor - the background color of the canvas
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.draw = function(bgColor) {
   this.context.beginPath();
   this.context.rect(0, 0, this.canvas.width, this.canvas.height);
   this.context.fillStyle = bgColor;
   this.context.fill();

   this.particles.forEach(function(particle) {
      particle.draw(this.context);
   }, this);

   return this;
}

/**
 * Executes upon every frame. Does bounds checking, environmental forces,
 * mouse forces, position updating, and finally drawing.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.frame = function(timestamp) {
   this.dt = this.prev > 0 ? (timestamp - this.prev) / 1000 : 0;
   this.prev = timestamp;

   this.boundsChecking()
    .applyGravity()
    .applyWind()
    .applyMouse()
    .updatePositions()
    .draw('#111111');

   window.requestAnimFrame(this.frame.bind(this));

   return this;
}

/**
 * Starts animating the canvas.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.start = function() {
   window.requestAnimFrame(this.frame.bind(this));

   return this;
}
