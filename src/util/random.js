/**
 * Creates and returns a Random instance.
 *
 * @constructor
 * @return {Random} |this| Random instance
 */
function Random() {}

/**
 * Returns a random number within [min, max).
 *
 * @param {Number} min - minimum number to return
 * @param {Number} max - maximum number to return
 * @return {Number} random number within [min, max)
 */
Random.prototype.number = function(min, max) {
   min = Math.min(min, max);
   max = Math.max(min, max);

   return min + Math.random() * (max - min);
}

/**
 * Returns a random color from a list.
 *
 * @return {String} random color
 */
Random.prototype.color = function() {
   var colors = ['BlueViolet', 'Chartreuse', 'Coral',
    'CornflowerBlue', 'Crimson', 'DeepPink', 'DeepSkyBlue', 'Fuchsia',
    'Gold', 'GreenYellow', 'HotPink', 'LightGreen', 'LightPink',
    'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSteelBlue',
    'MediumSlateBlue', 'MediumTurquoise', 'MediumVioletRed', 'Orange',
    'OrangeRed', 'Orchid', 'Plum', 'Red', 'RoyalBlue', 'SlateBlue',
    'Tomato', 'Violet', 'YellowGreen'];

   return colors[Math.floor(Math.random() * colors.length)];
}
