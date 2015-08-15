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

// Adds the velocity Vec2, |impulse| Vec2 divided by |this.mass| Number,
// to |this.vel| Vec2.
Particle.prototype.applyImpulse = function(impulse) {
   this.vel.mutableAdd(impulse.scale(1 / this.mass));
}

// Adds |this.vel| velocity Vec2 scaled by |dt| Number to |this.pos| Vec2.
Particle.prototype.updatePosition = function(dt) {
   this.pos.mutableAdd(this.vel.scale(dt));
}

// Draws |this| Particle onto the |context| CanvasRenderingContext2D.
Particle.prototype.draw = function(context) {
   context.beginPath();
   context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
   context.fillStyle = this.color;
   context.fill();
}
