// Constructs a Particle instance of |mass|, |radius|, |color|, and
// position |x| and |y| with a velocity Vector of (0, 0).
// A Particle instance is essentially a circle with properties to
// visualize on-screen and interact with physical laws.
function Particle(mass, radius, color, x, y) {
   this.mass = mass || 1;
   this.radius = radius || 10;
   this.color = color || '#FFFFFF';
   this.pos = new Vector(x, y);
   this.vel = new Vector(0, 0);
}

// Adds |this| velocity scaled by |dt| to |this| position.
Particle.prototype.updatePosition = function(dt) {
   if (dt) {
      this.pos.add(Vector.scale(this.vel, dt));
   }
}

// Applies a |force| Vector to |this| particle effectively accelerating it.
// Adds the acceleration vector, F / m, to |this| velocity.
Particle.prototype.applyForce = function(force) {
   if (force) {
      this.vel.add(Vector.scale(force, 1 / this.mass));
   }
}

// Returns the drag force Vector of |this| particle based on the |velocity|.
// The drag force consists of a coefficient times the density of the particle
// times the diameter of the circle times the |velocity| Vector squared.
Particle.prototype.dragForce = function(velocity) {
   return Vector.scale(velocity, velocity.distance() * 0.23 *
    this.density() * this.diameter());
}

// Returns the diameter of |this| particle.
Particle.prototype.diameter = function() {
   return this.radius + this.radius;
}

// Returns the area of |this| particle.
Particle.prototype.area = function() {
   return Math.PI * this.radius * this.radius;
}

// Returns the density of |this| particle.
Particle.prototype.density = function() {
   return this.mass / this.area();
}

// Returns the momentum of |this| particle.
Particle.prototype.momentum = function() {
   return Vector.scale(this.vel, this.mass);
}

// Returns the kinetic energy of |this| particle.
Particle.prototype.kineticEnergy = function() {
   var absVel = this.vel.distance();
   return 0.5 * this.mass * absVel * absVel;
}
