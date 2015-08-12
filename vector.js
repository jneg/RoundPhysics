// Constructs a Vector instance with an |x| and |y| property.
function Vector(x, y) {
   this.x = x || 0;
   this.y = y || 0;
}

// Adds |vec| to |this| Vector.
Vector.prototype.add = function(vec) {
   if (vec) {
      this.x += vec.x;
      this.y += vec.y;
   }
}

// Subtracts |vec| from |this| Vector.
Vector.prototype.sub = function(vec) {
   if (vec) {
      this.x -= vec.x;
      this.y -= vec.y;
   }
}

// Scales |this| Vector by |factor|.
Vector.prototype.scale = function(factor) {
   if (factor !== undefined) {
      this.x *= factor;
      this.y *= factor;
   }
}

// Returns the magnitude of |this| Vector.
Vector.prototype.distance = function() {
   return Math.sqrt(this.x * this.x + this.y * this.y);
}

// Returns the Vector summation of |vec1| and |vec2|.
Vector.add = function(vec1, vec2) {
   if (vec1 && vec2) {
      return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
   }
}

// Returns the Vector difference of |vec1| and |vec2|.
Vector.sub = function(vec1, vec2) {
   if (vec1 && vec2) {
      return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
   }
}

// Returns the Vector scale of |vec1| by |factor|.
Vector.scale = function(vec1, factor) {
   if (vec1 && factor !== undefined) {
      return new Vector(vec1.x * factor, vec1.y * factor);
   }
}

// Returns the magnitude of the Vector between |vec1| and |vec2|.
Vector.distance = function(vec1, vec2) {
   if (vec1 && vec2) {
      return Vector.sub(vec1, vec2).distance();
   }
}
