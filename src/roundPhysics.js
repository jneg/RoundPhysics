/**
 * Constructs a RoundPhysics context instance. This context attaches
 * to the canvas provided to animate and register mouse events on.
 * The context takes two vectors: gravity and wind for environmental
 * impulses on the particles.
 *
 * @constructor
 * @param {HTMLCanvasElement} canvas - the canvas to animate and register
 * mouse events on
 * @param {String} bgColor - the background color for the canvas
 * @param {Vec2} gravity - the gravity vector to apply to the environment
 * @param {Vec2} wind - the wind velocity vector to apply to the environment
 * @return {RoundPhysics} |this| RoundPhysics context
 */
function RoundPhysics(canvas, bgColor, gravity, wind) {
   this.canvas = canvas;
   this.viewport = this.canvas.getBoundingClientRect();
   this.context = this.canvas.getContext('2d');
   this.bgColor = bgColor;
   this.gravity = gravity;
   this.wind = wind;
   this.dragFriction = 0.02;
   this.energyRetained = 0.6;
   this.dt = 0;
   this.prev = 0;
   this.mouse = new Vec2(0, 0);
   this.selParticle = null;
   this.particles = [];

   this.setAnimFrame();

   this.canvas.addEventListener('contextmenu', this.preventDefault.bind(this));
   this.canvas.addEventListener('mousemove', this.setMouse.bind(this));
   this.canvas.addEventListener('mousedown', this.selectParticle.bind(this));
   this.canvas.addEventListener('mouseup', this.deselectParticle.bind(this));
   this.canvas.addEventListener('mouseleave', this.deselectParticle.bind(this));
}

/**
 * Prevents default behavior of the event that occured.
 *
 * @param {Event} e - the event
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.preventDefault = function(e) {
   e.preventDefault();

   return this;
}

/**
 * Sets the mouse vector to the coordinates of the mouse on the canvas.
 *
 * @param {Event} e - the event
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.setMouse = function(e) {
   this.mouse.mutableSet(e.clientX - this.viewport.left,
    e.clientY - this.viewport.top);

   return this;
}

/**
 * Selects the particle by first sorting the particles by their distance
 * to the mouse, and then looping through the particles in ascending
 * distance order to select the first particle that contains the mouse in it.
 * If no particle contains the mouse position, no particle is selected.
 *
 * @param {Event} e - the event
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.selectParticle = function(e) {
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
         this.selParticle = particle;

         return true;
      }
   }, this);

   return this;
}

/**
 * Sets the selected particle to null in |this| RoundPhysics context.
 *
 * @param {Event} e - the event
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.deselectParticle = function(e) {
   this.selParticle = null;

   return this;
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
 * Changes the |canvas| of |this| RoundPhysics context.
 *
 * @param {HTMLCanvasElement} canvas - the canvas to attach to
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.changeCanvas = function(canvas) {
   this.canvas.removeEventListener('contextmenu', this.defaultBehavior);
   this.canvas.removeEventListener('mousemove', this.setMouse);
   this.canvas.removeEventListener('mousedown', this.selectParticle);
   this.canvas.removeEventListener('mouseup', this.deselectParticle);
   this.canvas.removeEventListener('mouseleave', this.deselectParticle);

   this.canvas = canvas;
   this.viewport = this.canvas.getBoundingClientRect();
   this.context = this.canvas.getContext('2d');

   return this;
}

/**
 * Changes the background color on the canvas of |this| RoundPhysics context.
 *
 * @param {String} bgColor - the background color
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.changeBgColor = function(bgColor) {
   this.bgColor = bgColor;

   return this;
}

/**
 * Changes the gravity vector of |this| RoundPhysics context.
 *
 * @param {Vec2} gravity - the new gravity to apply to the environment
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.changeGravity = function(gravity) {
   this.gravity = gravity;

   return this;
}

/**
 * Changes the wind vector of |this| RoundPhysics context.
 *
 * @param {Vec2} wind - the new wind to apply to the environment
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.changeWind = function(wind) {
   this.wind = wind;

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
   this.particles.push(new Particle(particle.mass, particle.radius,
    particle.color, particle.pos.x, particle.pos.y));

   return this;
}

/**
 * Removes |remParticle| from |this| RoundPhysics context. This deletes
 * only one particle: the first particle in particles equal to |remParticle|.
 * If |remParticle| does not exist in particles, this method does nothing.
 * Particles are equal if they have the same mass, radius, and color.
 *
 * @param {Particle} remParticle - the equivalent particle to remove
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.removeParticle = function(remParticle) {
   this.particles.some(function(particle, index) {
      if (particle.equals(remParticle)) {
         this.particles.splice(index, 1);

         return true;
      }
   }, this);

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

/**
 * Executes upon every frame. Does bounds detection, environmental forces,
 * mouse forces, position updating, and finally drawing.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.frame = function(timestamp) {
   this.dt = this.prev > 0 ? (timestamp - this.prev) / 1000 : 0;
   this.prev = timestamp;

   this.boundsDetection()
    .applyGravity()
    .applyWind()
    .applyMouse()
    .updatePositions()
    .draw(this.bgColor);

   window.requestAnimFrame(this.frame.bind(this));

   return this;
}

/**
 * Bounces all particles out of bounds back into bounds by changing
 * their velocities and positions.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.boundsDetection = function() {
   this.particles.forEach(function(particle) {
      if (particle.pos.x + particle.radius > this.canvas.width) {
         particle.pos.x = this.canvas.width - particle.radius;
         particle.vel.x *= -1 * Math.sqrt(this.energyRetained);
      }

      if (particle.pos.x - particle.radius < 0) {
         particle.pos.x = particle.radius;
         particle.vel.x *= -1 * Math.sqrt(this.energyRetained);
      }

      if (particle.pos.y + particle.radius > this.canvas.height) {
         particle.pos.y = this.canvas.height - particle.radius;
         particle.vel.y *= -1 * Math.sqrt(this.energyRetained);
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
 * a dragging effect. If the mouse goes out of bounds, move the
 * selected particle to the very edge, but no more.
 *
 * @return {RoundPhysics} |this| RoundPhysics context
 */
RoundPhysics.prototype.applyMouse = function() {
   if (this.selParticle) {
      var rEdge = this.mouse.x > this.canvas.width - this.selParticle.radius;
      var lEdge = this.mouse.x < this.selParticle.radius;
      var bEdge = this.mouse.y > this.canvas.height - this.selParticle.radius;

      if (bEdge && lEdge) {
         this.selParticle.pos.mutableSet(this.selParticle.radius,
          this.canvas.height - this.selParticle.radius);
      } else if (bEdge && rEdge) {
         this.selParticle.pos.mutableSet(this.canvas.width -
          this.selParticle.radius, this.canvas.height -
          this.selParticle.radius);
      } else if (rEdge) {
         this.selParticle.pos.mutableSet(this.canvas.width -
          this.selParticle.radius, this.mouse.y);
      } else if (lEdge) {
         this.selParticle.pos.mutableSet(this.selParticle.radius,
          this.mouse.y);
      } else if (bEdge) {
         this.selParticle.pos.mutableSet(this.mouse.x,
          this.canvas.height - this.selParticle.radius);
      } else {
         this.selParticle.pos.mutableSet(this.mouse.x, this.mouse.y);
      }

      this.selParticle.vel.mutableSet(0, 0);
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
