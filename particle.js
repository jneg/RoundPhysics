// Constructs a Particle instance of |mass| Number, |radius| Number,
// |color| String, |pos| Vec2 of |x| and |y|, and |vel| Vec2 of 0 and 0.
// A Particle instance is a circle with visual and physical properties.
function Particle(mass, radius, color, x, y) {
   this.mass = mass;
   this.radius = radius;
   this.color = color;
   this.pos = new Vec2(x, y);
   this.vel = new Vec2(0, 0);
}

// Returns the diameter of |this| Particle.
Particle.prototype.diameter = function() {
   return this.radius + this.radius;
}

// Returns the area of |this| Particle.
Particle.prototype.area = function() {
   return Math.PI * this.radius * this.radius;
}

// Returns the density of |this| Particle.
Particle.prototype.density = function() {
   return this.mass / this.area();
}

// Draws |this| Particle onto the |ctx| CanvasRenderingContext2D.
Particle.prototype.draw = function(ctx) {
   ctx.beginPath();
   ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
   ctx.fillStyle = this.color;
   ctx.fill();
}

// Adds |this.vel| velocity Vec2 scaled by |dt| Number to
// |this.pos| position Vec2.
Particle.prototype.updatePosition = function(dt) {
   this.pos.mutableAdd(this.vel.scale(dt));
}

// Adds the acceleration Vec2, |force| Vec2 divided by |this.mass| Number,
// to |this.vel| Vec2.
Particle.prototype.applyForce = function(force) {
   this.vel.mutableAdd(force.scale(1 / this.mass));
}

// Returns the gravitational force Vec2 for |this| Particle derived from
// the grativational constant Number, |this.mass| Number, the external mass
// |extMass| Number, and the |distance| Number between the masses.
Particle.prototype.gravitationalForce = function(extMass, distance) {
   return new Vec2(0, 6.674 * Math.pow(10, -11) * this.mass * extMass /
    (distance * distance));
}

// Returns the drag force Vec2 for |this| Particle derived from the
// |velocity| Vec2, a coefficient Number, |this.density()| Number, and
// |this.diameter()| Number.
Particle.prototype.dragForce = function(velocity) {
   return velocity.scale(velocity.length() * 0.23 *
    this.density() * this.diameter());
}
