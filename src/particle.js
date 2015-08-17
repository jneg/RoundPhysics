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
   this.mass = mass;
   this.radius = radius;
   this.color = color;
   this.pos = new Vec2(x, y);
   this.vel = new Vec2(0, 0);
}

/**
 * Return true if |this| equals |ptcl|, otherwise false.
 * Two particles are equal if their masses, radii, and colors are equal.
 *
 * @param {Particle} ptcl - the particle to compare with |this|
 * @return {Boolean} true if |this| equals |ptcl|, otherwise false
 */
Particle.prototype.equals = function(ptcl) {
   return this.mass === ptcl.mass && this.radius === ptcl.radius &&
    this.color === ptcl.color;
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
 * Returns true if |point| is within |this| Particle's area, otherwise false.
 *
 * @param {Vec2} point - the point to check
 * @return {Boolean} true if |point| is within |this| Particle, otherwise false
 */
Particle.prototype.contains = function(point) {
   return this.pos.sub(point).length() < this.radius;
}

/**
 * Returns the drag force of |this| Particle which is the force vector applied
 * by the air on the Particle. This vector is dependent on the |windVel|
 * difference between the two mediums and a |dragFriction| constant.
 *
 * @param {Vec2} windVel - the velocity of the wind
 * @param {Number} dragFriction - the constant to multiply by the drag force
 * @return {Vec2} the drag force vector
 */
Particle.prototype.dragForce = function(windVel, dragFriction) {
   var velDiff = windVel.sub(this.vel);

   return velDiff.scale(velDiff.length() * dragFriction * this.density() *
    this.circumference() / 2);
}

/**
 * Applies an impulse vector to |this| Particle which changes its velocity.
 *
 * @param {Vec2} impulse - the impulse vector to apply to the Particle
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.applyImpulse = function(impulse) {
   this.vel.mutableAdd(impulse.scale(1 / this.mass));

   return this;
}

/**
 * Updates the position of |this| Particle by adding its velocity scaled by
 * |dt| to its position.
 *
 * @param {Number} dt - the change in time between frames
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.updatePosition = function(dt) {
   this.pos.mutableAdd(this.vel.scale(dt));

   return this;
}

/**
 * Draws |this| Particle onto the |context|.
 *
 * @param {CanvasRenderingContext2D} context - the context to draw to
 * @return {Particle} |this| Particle instance
 */
Particle.prototype.draw = function(context) {
   context.beginPath();
   context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
   context.fillStyle = this.color;
   context.fill();
  
   return this;
}
