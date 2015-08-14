// Elements
var cvs, ctx;
var prev = 0, dt;
var particles = [];

// Constants
var windVelocity = new Vec2(500, 0);
var earthMass = 180 * 5.972 * Math.pow(10, 24);
var earthRadius = 6.371 * Math.pow(10, 6);

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

   gravity(earthMass, earthRadius, dt);
   wind(windVelocity, dt);
   detectCollisions();
   updatePositions(dt);

   clearCanvas('#111111');
   drawParticles();

   window.requestAnimFrame(animate);
}

// Applies a drag force derived from |velocity| scaled by |dt|
// to every Particle.
function wind(velocity, dt) {
   particles.forEach(function(particle) {
      particle.applyForce(particle.dragForce(velocity).scale(dt));
   });
}

// Applies a gravitational force derived from |extMass| and |distance|
// scaled by |dt| to each Particle.
function gravity(extMass, distance, dt) {
   particles.forEach(function(particle) {
      particle.applyForce(particle.gravitationalForce(extMass,
       distance + (cvs.height - particle.pos.y)).scale(dt));
   });
}

// Collision detection in progress
function detectCollisions() {
   for (var i = 0; i < particles.length; ++i) {
      for (var j = i + 1; j < particles.length; ++j) {
         if (particles[i].pos.sub(particles[j].pos).length() <
          particles[i].radius + particles[j].radius) {
            // Colliding
         } else {
            // Not colliding
         }
      }
   }
}

// Updates the position of every Particle.
function updatePositions(dt) {
   particles.forEach(function(particle) {
      particle.updatePosition(dt);
   });
}

// Colors the whole canvas with |color|.
function clearCanvas(color) {
   ctx.beginPath();
   ctx.rect(0, 0, cvs.width, cvs.height);
   ctx.fillStyle = color;
   ctx.fill();
}

// Draws every Particle in |particles| onto the canvas.
function drawParticles() {
   particles.forEach(function(particle) {
      particle.draw(ctx);
   });
}
