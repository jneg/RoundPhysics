/**
 * @module CanvasHandler
 * @version 0.0.4
 * @author Javon Negahban
 *
 * @description CanvasHandler is an object which creates the canvas, draws
 * on the canvas, and handles mouse events of the canvas.
 *
 * CanvasHandler()
 * CanvasHandler.prototype.toString()
 * CanvasHandler.prototype.changeBgColor(bgColor)
 * CanvasHandler.prototype.getMouse()
 * CanvasHandler.prototype.draw(bodies)
 * CanvasHandler.prototype.clearCanvas()
 */

/**
 * @constructor
 * @param {String} bgColor - the background color of the environment
 * @return {CanvasHandler} |this| CanvasHandler instance
 *
 * @description Creates and returns |this| CanvasHandler instance.
 */
function CanvasHandler() {
   this.canvas = document.createElement('canvas');
   this.canvas.style.display = 'block';
   this.canvas.width = window.innerWidth;
   this.canvas.height = window.innerHeight;
   document.body.style.margin = '0px';
   document.body.appendChild(this.canvas);

   this.changeBgColor('#ffffff');

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
 * @method toString
 * @return {String} the string representation of |this| CanvasHandler instance
 *
 * @description Returns the string representation of |this| CanvasHandler
 * instance.
 */
CanvasHandler.prototype.toString = function() {
   return '{CanvasHandler} bgColor: ' + this.bgColor + ', mouse: '
    + this.mouse;
}

/**
 * @method changeBgColor
 * @param {String} bgColor - the background color to change to
 * @return {CanvasHandler} |this| CanvasHandler instance
 *
 * @description Changes the background color of the environment.
 */
CanvasHandler.prototype.changeBgColor = function(bgColor) {
   this.bgColor = bgColor;
   document.body.style.backgroundColor = bgColor;

   return this;
}

/**
 * @method getMouse
 * @return {Vec2} the mouse position vector
 *
 * @description Returns the mouse position vector.
 */
CanvasHandler.prototype.getMouse = function() {
   return this.mouse;
}

/**
 * @method draw
 * @param {Body[]} bodies - the bodies to draw on the canvas
 * @return {CanvasHandler} |this| CanvasHandler instance
 *
 * @description Draws the |bgColor| and the |bodies| onto the canvas.
 */
CanvasHandler.prototype.draw = function(bodies) {
   this.clearCanvas();

   bodies.forEach(function(body) {
      body.draw(this.context);
   }, this);

   return this;
}

/**
 * @method clearCanvas
 * @return {CanvasHandler} |this| CanvasHandler instance
 *
 * @description Clears the canvas with the bgColor.
 */
CanvasHandler.prototype.clearCanvas = function() {
   this.context.beginPath();
   this.context.rect(0, 0, this.canvas.width, this.canvas.height);
   this.context.fillStyle = this.bgColor;
   this.context.fill();

   return this;
}
