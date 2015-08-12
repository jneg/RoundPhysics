// Elements
var cvs, ctx;
var prev = 0, dt;
var particles = [];

// Constants
var windVelocity = new Vector(500, 0);
var gConstant = 1500;

// Initializes the animation by grabbing the canvas element, setting
// cross-browser support for the animation frame function, adding
// particles and starting the animation.
function init() {
   cvs = document.getElementById('cvs');
   ctx = cvs.getContext('2d');
   setAnimFrame();
   addParticles();
   window.requestAnimFrame(animate);
}

// Sets the window.requestAnimFrame function for cross-browser support.
function setAnimFrame() {
   window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
       window.setTimeout(callback, 1000 / 60);
    };
}

// Adds particles onto the |particles| array.
function addParticles() {
   particles.length = 0;

   particles.push(new Particle(3, 30, 'blue', 200, 80));
   particles.push(new Particle(10, 50, 'yellow', 400, 80));
   particles.push(new Particle(0.5, 10, 'green', 600, 80));
   particles.push(new Particle(7, 40, 'orange', 800, 80));
   particles.push(new Particle(2, 20, 'red', 1000, 80));
}

// Main event loop which gets called before every frame.
function animate(timestamp) {
   dt = prev > 0 ? (timestamp - prev) / 1000 : 0;
   prev = timestamp;

   wind(windVelocity, dt);
   gravity(gConstant, dt);
   detectCollisions();
   updatePositions(dt);

   clearCanvas('#111111');
   drawParticles();

   window.requestAnimFrame(animate);
}

// Applies a drag force of |velocity| scaled by |dt| to every Particle.
function wind(velocity, dt) {
   particles.forEach(function(particle) {
      particle.applyForce(Vector.scale(particle.dragForce(velocity), dt));
   });
}

// Applies a gravity force of |strength| to each Particle.
function gravity(strength, dt) {
   particles.forEach(function(particle) {
      particle.applyForce(Vector.scale(new Vector(0, strength * particle.mass),
       dt));
   });
}

// Updates the position of every Particle.
function updatePositions(dt) {
   particles.forEach(function(particle) {
      particle.updatePosition(dt);
   });
}

// Collision detection in progress
function detectCollisions() {
   for (var i = 0; i < particles.length; ++i) {
      for (var j = i + 1; j < particles.length; ++j) {
         if (Vector.distance(particles[i].pos, particles[j].pos) <
          particles[i].radius + particles[j].radius) {
            // Colliding
         } else {
            // Not colliding
         }
      }
   }
}

// Colors the whole canvas with |color|.
function clearCanvas(color) {
   ctx.save();

   ctx.beginPath();
   ctx.rect(0, 0, cvs.width, cvs.height);
   ctx.fillStyle = color;
   ctx.fill();

   ctx.restore();
}

// Draws every Particle in |particles| onto the canvas.
function drawParticles() {
   particles.forEach(function(particle) {
      drawParticle(particle);
   });
}

// Draws Particle |particle| onto the canvas.
function drawParticle(particle) {
   ctx.save();

   ctx.beginPath();
   ctx.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI);
   ctx.fillStyle = particle.color;
   ctx.fill();

   ctx.restore();
}
