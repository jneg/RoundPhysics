var cvs, ctx;
var prev = 0, dt;
var particles = [];
var windVelocity = new Vector(10, 0);
var gConstant = 1200;

function init() {
   cvs = document.getElementById('cvs');
   ctx = cvs.getContext('2d');
   setAnimFrame();
   addParticles();
   window.requestAnimFrame(animate);
}

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

function addParticles() {
   particles.length = 0;

   particles.push(new Particle(3, 30, 'blue', 200, 80));
   particles.push(new Particle(10, 50, 'yellow', 400, 80));
   particles.push(new Particle(0.5, 10, 'green', 600, 80));
   particles.push(new Particle(7, 40, 'orange', 800, 80));
   particles.push(new Particle(2, 20, 'red', 1000, 80));
}

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

function wind(velocity, dt) {
   particles.forEach(function(particle) {
      particle.dragForce(velocity, dt);
   });
}

function gravity(strength, dt) {
   particles.forEach(function(particle) {
      particle.applyForce(Vector.scale(new Vector(0, strength * particle.mass),
       dt));
   });
}

function updatePositions(dt) {
   particles.forEach(function(particle) {
      particle.updatePosition(dt);
   });
}

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

function clearCanvas(color) {
   ctx.save();

   ctx.beginPath();
   ctx.rect(0, 0, cvs.width, cvs.height);
   ctx.fillStyle = color;
   ctx.fill();

   ctx.restore();
}

function drawParticles() {
   particles.forEach(function(particle) {
      drawParticle(particle);
   });
}

function drawParticle(particle) {
   ctx.save();

   ctx.beginPath();
   ctx.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI);
   ctx.fillStyle = particle.color;
   ctx.fill();

   ctx.restore();
}
