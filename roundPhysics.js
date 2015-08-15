window.requestAnimFrame =
 window.requestAnimationFrame ||
 window.webkitRequestAnimationFrame ||
 window.mozRequestAnimationFrame ||
 window.oRequestAnimationFrame ||
 window.msRequestAnimationFrame ||
 function(callback) {
    window.setTimeout(callback, 1000 / 60);
 };

function RoundPhysics(canvas, gravity, wind) {
   this.canvas = canvas;
   this.context = canvas.getContext('2d');
   this.gravity = gravity;
   this.wind = wind;
   this.particles = [];
   this.dt = 0;
   this.prev = 0;
}

RoundPhysics.prototype.addParticle = function(particle) {
   this.particles.push(particle);
}

RoundPhysics.prototype.applyGravity = function() {
   if (this.gravity) {
      this.particles.forEach(function(particle) {
         particle.applyForce(this.gravity.scale(particle.mass * this.dt));
      }, this);
   }
}

RoundPhysics.prototype.applyWind = function() {
   if (this.wind) {
      this.particles.forEach(function(particle) {
         particle.applyForce(this.wind.scale(this.dt));
      }, this);
   }
}

RoundPhysics.prototype.updatePositions = function() {
   this.particles.forEach(function(particle) {
      particle.updatePosition(this.dt);
   }, this)
}

RoundPhysics.prototype.draw = function(bgColor) {
   this.context.beginPath();
   this.context.rect(0, 0, this.canvas.width, this.canvas.height);
   this.context.fillStyle = bgColor;
   this.context.fill();

   this.particles.forEach(function(particle) {
      particle.draw(this.context);
   }, this);
}

RoundPhysics.prototype.frame = function(timestamp) {
   this.dt = this.prev > 0 ? (timestamp - this.prev) / 1000 : 0;
   this.prev = timestamp;

   this.applyGravity();
   this.applyWind();
   this.updatePositions();
   this.draw('#111111');

   window.requestAnimFrame(this.frame.bind(this));
}

RoundPhysics.prototype.start = function() {
   window.requestAnimFrame(this.frame.bind(this));
}
