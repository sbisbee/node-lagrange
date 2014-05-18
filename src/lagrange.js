/*
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var gf = require('galois');

module.exports.galois = function(x, xValues, yValues, gfW) {
  var calcProduct = function(i) {
    var j;
    var p = [];

    for(j = 0; j < xValues.length; j++) {
      if(j === i) {
        continue;
      }

      p.push(gf.single_divide(
              gf.subtract(x, xValues[j]),
              gf.subtract(xValues[i], xValues[j]),
              gfW));
    }

    return p.reduce(function(prev, curr) {
      return gf.single_multiply(prev, curr, gfW);
    }, 1);
  };

  var accum = 0;

  yValues.forEach(function(currY, idx) {
    accum = gf.add(accum, gf.single_multiply(calcProduct(idx), currY, gfW));
  });

  return accum;
};

module.exports.base10 = function(x, xValues, yValues) {
  var calcProduct = function(i) {
    var j;
    var p = [];

    for(j = 0; j < xValues.length; j++) {
      if(j === i) {
        continue;
      }

      p.push((x - xValues[j]) / (xValues[i] - xValues[j]));
    }

    return p.reduce(function(prev, curr) {
      return prev * curr;
    }, 1);
  };

  var accum = 0;

  yValues.forEach(function(currY, idx) {
    accum += currY * calcProduct(idx);
  });

  return accum;
};

/*
 * Takes an array of coords (tuples), splitting them into an array of x-values
 * and y-values, which are then returned as a tuple.
 */
module.exports.splitCoords = function(coords) {
  var xValues = [];
  var yValues = [];
  var i;

  for(i = 0; i < coords.length; i++) {
    xValues[i] = coords[i][0];
    yValues[i] = coords[i][1];
  };

  return [xValues, yValues];
};
