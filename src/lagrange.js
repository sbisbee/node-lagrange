var gf = require('galois');

module.exports = function(gfW, x, coords) {
  var calcProduct = function(i) {
    var reducer = function(prev, curr) {
      return gf.single_multiply(prev, curr, gfW);
    };

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

  var xValues = [];
  var yValues = [];

  coords.forEach(function(point, idx) {
    xValues[idx] = point[0];
    yValues[idx] = point[1];
  });

  yValues.forEach(function(currY, idx) {
    accum = gf.add(accum, gf.single_multiply(calcProduct(idx), currY, gfW));
  });

  return accum;
};
