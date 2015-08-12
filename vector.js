function Vector(x, y) {
   this.x = x || 0;
   this.y = y || 0;
}

Vector.prototype.add = function(vec) {
   if (vec) {
      this.x += vec.x;
      this.y += vec.y;
   }
}

Vector.prototype.sub = function(vec) {
   if (vec) {
      this.x -= vec.x;
      this.y -= vec.y;
   }
}

Vector.prototype.mult = function(vec) {
   if (vec) {
      this.x *= vec.x;
      this.y *= vec.y;
   }
}

Vector.prototype.div = function(vec) {
   if (vec) {
      this.x /= vec.x;
      this.y /= vec.y;
   }
}

Vector.prototype.scale = function(factor) {
   if (factor !== undefined) {
      this.x *= factor;
      this.y *= factor;
   }
}

Vector.prototype.distance = function() {
   return Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
}

Vector.add = function(vec1, vec2) {
   if (vec1 && vec2) {
      return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
   }
}

Vector.sub = function(vec1, vec2) {
   if (vec1 && vec2) {
      return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
   }
}

Vector.mult = function(vec1, vec2) {
   if (vec1 && vec2) {
      return new Vector(vec1.x * vec2.x, vec1.y * vec2.y);
   }
}

Vector.div = function(vec1, vec2) {
   if (vec1 && vec2) {
      return new Vector(vec1.x / vec2.x, vec1.y / vec2.y);
   }
}

Vector.scale = function(vec1, factor) {
   if (vec1) {
      return new Vector(vec1.x * factor, vec1.y * factor);
   }
}

Vector.distance = function(vec1, vec2) {
   var dx = Math.abs(vec2.x - vec1.x);
   var dy = Math.abs(vec2.y - vec1.y);
   return Math.sqrt(dx * dx + dy * dy);
}
