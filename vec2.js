// Constructs a Vec2 instance with an |x| Number and |y| Number property.
// Vec2 represents a 2 dimensional vector.
function Vec2(x, y) {
   this.x = x || 0;
   this.y = y || 0;
}

// Returns the length Number of |this| Vec2.
Vec2.prototype.length = function() {
   return Math.sqrt(this.x * this.x + this.y * this.y);
}

// Returns the angle Number in radians from the x-axis of |this| Vec2.
Vec2.prototype.angle = function() {
   return Math.atan(this.y / this.x);
}

// Returns the coordinate-modified Vec2 with the axis rotated by |angle|.
Vec2.prototype.axis = function(angle) {
   return new Vector(this.x * Math.cos(angle) + this.y * Math.sin(angle),
    this.x * Math.sin(angle) + this.y * Math.cos(angle));
}

// Returns the summation Vec2 of |this| Vec2 and |v| Vec2.
Vec2.prototype.add = function(v) {
   return new Vec2(this.x + v.x, this.y + v.y);
}

// Returns the difference Vec2 of |this| Vec2 and |v| Vec2.
Vec2.prototype.sub = function(v) {
   return new Vec2(this.x - v.x, this.y - v.y);
}

// Returns the scale Vec2 of |this| Vec2 and |factor| Number.
Vec2.prototype.scale = function(factor) {
   return new Vec2(this.x * factor, this.y * factor);
}

// Adds |v| Vec2 to |this| Vec2.
Vec2.prototype.mutableAdd = function(v) {
   this.x += v.x;
   this.y += v.y;
}

// Subtracts |v| Vec2 from |this| Vec2.
Vec2.prototype.mutableSub = function(v) {
   this.x -= v.x;
   this.y -= v.y;
}

// Scales |this| Vec2 by |factor| Number.
Vec2.prototype.mustableScale = function(factor) {
   this.x *= factor;
   this.y *= factor;
}
