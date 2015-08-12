function Particle(mass, radius, color, x, y) {
   this.mass = mass || 1;
   this.radius = radius || 10;
   this.color = color || '#FFFFFF';
   this.pos = new Vector(x, y);
   this.vel = new Vector(0, 0)
}

Particle.prototype.updatePosition = function(dt) {
   if (dt) {
      this.pos.add(Vector.scale(this.vel, dt));
   }
}

Particle.prototype.applyForce = function(force) {
   if (force) {
      this.vel.add(Vector.scale(force, 1 / this.mass));
   }
}

Particle.prototype.dragForce = function(velocity) {
   this.applyForce(Vector.scale(velocity, velocity.distance() *
    this.density() * this.diameter()));
}

Particle.prototype.diameter = function() {
   return this.radius + this.radius;
}

Particle.prototype.circumference = function() {
   return Math.PI * this.diameter();
}

Particle.prototype.area = function() {
   return Math.PI * this.radius * this.radius;
}

Particle.prototype.density = function() {
   return this.mass / this.area();
}

Particle.prototype.momentum = function() {
   return Vector.scale(this.vel, this.mass);
}

Particle.prototype.kineticEnergy = function() {
   var absVel = this.vel.distance();
   return 0.5 * this.mass * absVel * absVel;
}
