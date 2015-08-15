// Make window.requestAnimFrame cross-browser supported
window.requestAnimFrame =
 window.requestAnimationFrame ||
 window.webkitRequestAnimationFrame ||
 window.mozRequestAnimationFrame ||
 window.oRequestAnimationFrame ||
 window.msRequestAnimationFrame ||
 function(callback) {
    window.setTimeout(callback, 1000 / 60);
 };

// Constructs a RoundPhysics context with the provided |canvas|
// HTMLCanvasElement, |gravity| Vec2, and |wind| Vec2.
function RoundPhysics(canvas, gravity, wind) {
   this.canvas = canvas;
   this.context = canvas.getContext('2d');
   this.gravity = gravity;
   this.wind = wind;
   this.particles = [];
   this.dt = 0;
   this.prev = 0;
}

// Add |particle| Particle into |this| RoundPhysics context.
RoundPhysics.prototype.addParticle = function(particle) {
   this.particles.push(particle);
}

// Applies a gravitational impulse to all Particles in |this| RoundPhysics
// context.
RoundPhysics.prototype.applyGravity = function() {
   if (this.gravity) {
      this.particles.forEach(function(particle) {
         particle.applyImpulse(this.gravity.scale(particle.mass * this.dt));
      }, this);
   }
}

// Applies a wind impulse to all Particles in |this| RoundPhysics context.
RoundPhysics.prototype.applyWind = function() {
   if (this.wind) {
      this.particles.forEach(function(particle) {
         particle.applyImpulse(this.wind.scale(this.dt));
      }, this);
   }
}

// Updates the positions of all Particles in |this| RoundPhysics context.
RoundPhysics.prototype.updatePositions = function() {
   this.particles.forEach(function(particle) {
      particle.updatePosition(this.dt);
   }, this)
}

// Clears the canvas with |bgColor| String and draws all Particles onto
// the canvas of |this| RoundPhysics context.
RoundPhysics.prototype.draw = function(bgColor) {
   this.context.beginPath();
   this.context.rect(0, 0, this.canvas.width, this.canvas.height);
   this.context.fillStyle = bgColor;
   this.context.fill();

   this.particles.forEach(function(particle) {
      particle.draw(this.context);
   }, this);
}

// Function to execute for every frame of |this| RoundPhysics context.
// Applies a graviational and wind impulse to all Particles, updates their
// positions, and finally draws the Particles.
RoundPhysics.prototype.frame = function(timestamp) {
   this.dt = this.prev > 0 ? (timestamp - this.prev) / 1000 : 0;
   this.prev = timestamp;

   this.applyGravity();
   this.applyWind();
   this.updatePositions();
   this.draw('#111111');

   window.requestAnimFrame(this.frame.bind(this));
}

// Starts |this| RoundPhysics context.
RoundPhysics.prototype.start = function() {
   window.requestAnimFrame(this.frame.bind(this));
}
