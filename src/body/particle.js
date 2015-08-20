/**
 * Constructs a Particle instance which is a circle with physical properties.
 *
 * @constructor
 * @param {Number} mass - the mass of the Particle
 * @param {Number} radius - the radius of the Particle
 * @param {String} color - the color of the Particle
 * @param {Number} x - the x coordinate position of the Particle
 * @param {Number} y - the y coordinate position of the Particle
 * @return {Particle} |this| Particle instance
 */
function Particle(mass, radius, color, x, y) {
   if (arguments.length < 5) {
      var rand = new Random();

      this.mass = rand.number(0.2, 4);
      this.radius = Math.floor(this.mass * 5);
      this.color = rand.color();
      this.posPrev = new Vec2(Math.floor(rand.number(0, window.innerWidth)),
       Math.floor(rand.number(0, window.innerHeight)));
      this.pos = new Vec2(this.posPrev.x, this.posPrev.y);
   } else {
      this.mass = mass;
      this.radius = radius;
      this.color = color;
      this.posPrev = new Vec2(x, y);
      this.pos = new Vec2(x, y);
   }

   this.accPrev = new Vec2(0, 0);
   this.acc = new Vec2(0, 0);
   this.behaviors = [];
}

/**
 * Adds |behavior| to |this| Particle.
 *
 * @param {Behavior} behavior - the behavior to add
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.addBehavior = function(behavior) {
   this.behaviors.push(behavior);

   return this;
}

/**
 * Deletes |behavior| from |this| Particle.
 *
 * @param {Behavior} behavior - the behavior to delete
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.delBehavior = function(behavior) {

   return this;
}

/**
 * Applies all behaviors of |this| Particle.
 *
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.applyBehaviors = function() {
   this.behaviors.forEach(function(behavior) {
      behavior.apply(this);
   }, this);

   return this;
}

/**
 * Returns the string representation of |this| Particle.
 *
 * @return {String} the string representation of |this| Particle
 */
Particle.prototype.toString = function() {
   return '{Particle} mass: ' + this.mass + ', radius: ' + this.radius +
    ', color: ' + this.color + ', posPrev: ' + this.posPrev + ', pos: ' +
    this.pos + ', accPrev: ' + this.accPrev + ', acc: ' + this.acc +
    ', behaviors: ' + this.behaviors.toString();
}

/**
 * Returns the diameter of |this| Particle.
 *
 * @return {Number} the diameter of |this| Particle
 */
Particle.prototype.diameter = function() {
   return 2 * this.radius;
}

/**
 * Returns the circumference of |this| Particle.
 *
 * @return {Number} the circumference of |this| Particle
 */
Particle.prototype.circumference = function() {
   return Math.PI * this.diameter();
}

/**
 * Returns the area of |this| Particle.
 *
 * @return {Number} the area of |this| Particle
 */
Particle.prototype.area = function() {
   return Math.PI * this.radius * this.radius;
}

/**
 * Returns the area density of |this| Particle.
 *
 * @return {Number} the area density of |this| Particle
 */
Particle.prototype.density = function() {
   return this.mass / this.area();
}

/**
 * Return true if |this| equals |oParticle|, otherwise false.
 * Two particles are equal if their masses, radii, and colors are equal.
 *
 * @param {Particle} oParticle - the other particle to compare with |this|
 * @return {Boolean} true if |this| equals |oParticle|, otherwise false
 */
Particle.prototype.equals = function(oParticle) {
   return this.mass === oParticle.mass && this.radius === oParticle.radius &&
    this.color === oParticle.color;
}

/**
 * Returns true if |point| is within |this| Particle's area, otherwise false.
 *
 * @param {Vec2} point - the point vector to check
 * @return {Boolean} true if |point| is within |this| Particle, otherwise false
 */
Particle.prototype.contains = function(point) {
   return this.pos.sub(point).length() <= this.radius;
}

/**
 * Applies a force vector to |this| Particle which changes its acceleration.
 *
 * @param {Vec2} force - the force vector to apply to the Particle
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.applyForce = function(force) {
   this.acc.mutableAdd(force.scale(1 / this.mass));

   return this;
}

/**
 * Draws |this| Particle onto the |context|.
 *
 * @param {CanvasRenderingContext2D} context - the context to draw on
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.draw = function(context) {
   context.beginPath();
   context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
   context.fillStyle = this.color;
   context.fill();

   return this;
}
