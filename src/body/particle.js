/**
 * @module Particle
 * @version 0.0.1
 * @author Javon Negahban
 *
 * @description A Particle instance is a circle with physical properties:
 * mass, radius, and color, motion vectors: position, velocity, and
 * acceleration, and behaviors: actions that affect the Particle.
 *
 * Particle.prototype.toString()
 * Particle.prototype.equals(p)
 * Particle.prototype.diameter()
 * Particle.prototype.circumference()
 * Particle.prototype.area()
 * Particle.prototype.density()
 * Particle.prototype.kineticEnergy()
 * Particle.prototype.contains(point)
 * Particle.prototype.applyForce(force)
 * Particle.prototype.draw(context)
 * Particle.prototype.addBehavior(behavior)
 * Particle.prototype.delBehavior(behavior)
 * Particle.prototype.applyBehaviors()
 */

/**
 * @constructor
 * @param {Number} mass - the mass of the Particle
 * @param {Number} radius - the radius of the Particle
 * @param {String} color - the color of the Particle
 * @param {Number} x - the x coordinate position of the Particle
 * @param {Number} y - the y coordinate position of the Particle
 * @return {Particle} |this| Particle instance
 *
 * @description Constructs a Particle instance.
 */
function Particle(mass, radius, color, x, y) {
   if (arguments.length < 5) {
      var rand = new Random();

      this.mass = rand.number(0.5, 5);
      this.radius = this.mass * 4;
      this.color = rand.color();
      this.pos = new Vec2(Math.floor(rand.number(100, window.innerWidth - 100))
       , Math.floor(rand.number(100, window.innerHeight - 100)));
   } else {
      this.mass = mass;
      this.radius = radius;
      this.color = color;
      this.pos = new Vec2(x, y);
   }

   this.vel = new Vec2(0, 0);
   this.acc = new Vec2(0, 0);
   this.behaviors = [];
}

/**
 * @method toString
 * @return {String} the string representation of |this| Particle instance
 *
 * @description Returns the string representation of |this| Particle instance.
 */
Particle.prototype.toString = function() {
   return '{Particle} mass: ' + this.mass + ', radius: ' + this.radius
    + ', color: ' + this.color + ', pos: ' + this.pos + ', vel: ' + this.vel
    + ', acc: ' + this.acc + ', behaviors: ' + this.behaviors.toString()
    + ', kinetic energy: ' + this.kineticEnergy();
}

/**
 * @method equals
 * @param {Particle} p - the other particle to compare with |this|
 * @return {Boolean} true if |this| equals |p|, otherwise false
 *
 * @description Returns true if |this| equals |p|, otherwise false.
 * Two particles are equal if their masses, radii, and colors are the same.
 */
Particle.prototype.equals = function(p) {
   return this.mass === p.mass && this.radius === p.radius
    && this.color === p.color;
}

/**
 * @method diameter
 * @return {Number} the diameter of |this| Particle instance
 *
 * @description Returns the diameter of |this| Particle instance.
 */
Particle.prototype.diameter = function() {
   return 2 * this.radius;
}

/**
 * @method circumference
 * @return {Number} the circumference of |this| Particle instance
 *
 * @description Returns the circumference of |this| Particle instance.
 */
Particle.prototype.circumference = function() {
   return Math.PI * this.diameter();
}

/**
 * @method area
 * @return {Number} the area of |this| Particle instance
 *
 * @description Returns the area of |this| Particle instance.
 */
Particle.prototype.area = function() {
   return Math.PI * this.radius * this.radius;
}

/**
 * @method density
 * @return {Number} the area density of |this| Particle instance
 *
 * @description Returns the area density of |this| Particle instance.
 */
Particle.prototype.density = function() {
   return this.mass / this.area();
}

/**
 * @method kineticEnergy
 * @return {Number} the kinetic energy of |this| Particle instance
 *
 * @description Returns the kinetic energy of |this| Particle instance.
 */
Particle.prototype.kineticEnergy = function() {
   var velAbs = this.vel.length();

   return 0.5 * this.mass * velAbs * velAbs;
}

/**
 * @method contains
 * @param {Vec2} point - the point vector to check
 * @return {Boolean} true if |point| is within |this| Particle, otherwise false
 *
 * @description Returns true if |point| is within |this| Particle's area,
 * otherwise false.
 */
Particle.prototype.contains = function(point) {
   return this.pos.sub(point).length() <= this.radius;
}

/**
 * @method applyForce
 * @param {Vec2} force - the force vector to apply to the Particle
 * @return {Particle} |this| Particle instance
 *
 * @description Applies a force vector to |this| Particle instance
 * which changes its acceleration.
 */
Particle.prototype.applyForce = function(force) {
   this.acc.mutableAdd(force.scale(1 / this.mass));

   return this;
}

/**
 * @method draw
 * @param {CanvasRenderingContext2D} context - the context to draw on
 * @return {Particle} |this| Particle instance
 *
 * @description Draws |this| Particle instance onto the |context|.
 */
Particle.prototype.draw = function(context) {
   context.beginPath();
   context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
   context.fillStyle = this.color;
   context.fill();

   return this;
}

/**
 * @method addBehavior
 * @param {Behavior} behavior - the behavior to add
 * @return {Particle} |this| Particle instance
 *
 * @description Adds |behavior| to |this| Particle instance.
 */
Particle.prototype.addBehavior = function(behavior) {
   this.behaviors.push(behavior);

   return this;
}

/**
 * @method delBehavior
 * @param {Behavior} behavior - the behavior to delete
 * @return {Particle} |this| Particle instance
 *
 * @description Deletes |behavior| from |this| Particle instance.
 */
Particle.prototype.delBehavior = function(behavior) {
   

   return this;
}

/**
 * @method applyBehaviors
 * @param {Number} dt - the change in time
 * @return {Particle} |this| Particle instance
 *
 * @description Applies all of |this| Particle's behaviors onto itself.
 */
Particle.prototype.applyBehaviors = function(dt) {
   this.behaviors.forEach(function(behavior) {
      behavior.apply(this, dt);
   }, this);

   return this;
}
