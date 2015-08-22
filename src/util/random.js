/**
 * @module Random
 * @version 0.0.1
 * @author Javon Negahban
 *
 * @description A Random object returns random entities.
 *
 * Random.prototype.toString()
 * Random.prototype.number(min, max)
 * Random.prototype.color()
 */

/**
 * @constructor
 * @return {Random} |this| Random instance
 *
 * @description Constructs and returns a Random instance.
 */
function Random() {}

/**
 * @method toString
 * @return {String} the string representation of |this| Random instance
 *
 * @description Returns the string representation of |this| Random instance.
 */
Random.prototype.toString = function() {
   return '{Random}';
}

/**
 * @method number
 * @param {Number} min - minimum number to return
 * @param {Number} max - maximum number to return
 * @return {Number} random number within [min, max)
 *
 * @description Returns a random number within [min, max).
 */
Random.prototype.number = function(min, max) {
   min = Math.min(min, max);
   max = Math.max(min, max);

   return min + Math.random() * (max - min);
}

/**
 * @method color
 * @return {String} random color from a pre-chosen list
 *
 * @description Returns a random color from a pre-chosen HTML5 list of colors.
 */
Random.prototype.color = function() {
   var colors = ['BlueViolet', 'Chartreuse', 'Coral'
    , 'CornflowerBlue', 'Crimson', 'DeepPink', 'DeepSkyBlue', 'Fuchsia'
    , 'Gold', 'GreenYellow', 'HotPink', 'LightGreen', 'LightPink'
    , 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSteelBlue'
    , 'MediumSlateBlue', 'MediumTurquoise', 'MediumVioletRed', 'Orange'
    , 'OrangeRed', 'Orchid', 'Plum', 'Red', 'RoyalBlue', 'SlateBlue'
    , 'Tomato', 'Violet', 'YellowGreen'];

   return colors[Math.floor(Math.random() * colors.length)];
}
