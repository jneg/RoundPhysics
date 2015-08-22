/**
 * Creates and returns a CanvasHandler instance. This instance
 * creates, draws, and handles mouse events on the canvas.
 *
 * @constructor
 * @param {String} bgColor - the background color of the canvas
 * @return {CanvasHandler} |this| CanvasHandler instance
 */
function CanvasHandler(bgColor) {
   this.changeBgColor(bgColor);
   this.canvas = document.createElement('canvas');
   this.canvas.style.display = 'block';
   this.canvas.width = window.innerWidth;
   this.canvas.height = window.innerHeight;
   document.body.style.margin = '0px';
   document.body.appendChild(this.canvas);

   this.context = this.canvas.getContext('2d');
   this.context.globalCompositeOperation = 'source-over';
   this.mouse = new Vec2(0, 0);

   window.addEventListener('resize', (function(e) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
   }).bind(this));

   this.canvas.addEventListener('contextmenu', (function(e) {
      e.preventDefault();
   }).bind(this));

   this.canvas.addEventListener('mousemove', (function(e) {
      var viewport = this.canvas.getBoundingClientRect();

      this.mouse.mutableSet(new Vec2(e.clientX - viewport.left
       , e.clientY - viewport.top));
   }).bind(this));
}

/**
 * Changes the background color of the environment.
 *
 * @return {CanvasHandler} |this| CanvasHandler instance
 */
CanvasHandler.prototype.changeBgColor = function(bgColor) {
   this.bgColor = bgColor;
   document.body.style.backgroundColor = this.bgColor;

   return this;
}

/**
 * Returns the mouse vector.
 *
 * @return {Vec2} the mouse vector
 */
CanvasHandler.prototype.getMouse = function() {
   return this.mouse;
}

/**
 * Draws the |bgColor| and the |bodies| onto the canvas.
 *
 * @param {String} bgColor - the background color of the canvas
 * @param {Body[]} bodies - the bodies to draw on the canvas
 * @return {CanvasHandler} |this| CanvasHandler instance
 */
CanvasHandler.prototype.draw = function(bodies) {
   this.clearCanvas();

   bodies.forEach(function(body) {
      body.draw(this.context);
   }, this);

   return this;
}

/**
 * Clears the canvas with the bgColor.
 *
 * @return {CanvasHandler} |this| CanvasHandler instance
 */
CanvasHandler.prototype.clearCanvas = function() {
   this.context.beginPath();
   this.context.rect(0, 0, this.canvas.width, this.canvas.height);
   this.context.fillStyle = this.bgColor;
   this.context.fill();

   return this;
}

/**
 * Returns the string representation of |this| CanvasHandler instance.
 *
 * @return {String} the string representation of |this| CanvasHandler instance
 */
CanvasHandler.prototype.toString = function() {
   return '{CanvasHandler} bgColor: ' + this.bgColor + ', mouse: '
    + this.mouse;
}
