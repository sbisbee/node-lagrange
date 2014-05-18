var vows = require('vows');
var assert = require('assert');

var lagrange = require('../src/lagrange.js');

var GF_W = 8;

vows.describe('Galois').addBatch({
  'y=x': {
    topic: [[1, 2, 3], [1, 2, 3]],

    'x=0': function(coords) {
      assert.equal(lagrange.galois(0, coords[0], coords[1], GF_W), 0);
    },

    'x=4': function(coords) {
      assert.equal(lagrange.galois(4, coords[0], coords[1], GF_W), 4);
    }
  },

  'y=2x+123': {
    topic: [[1, 2, 4], [121, 127, 115]],

    'x=0': function(coords) {
      assert.equal(lagrange.galois(0, coords[0], coords[1], GF_W), 123);
    },

    'x=3': function(coords) {
      assert.equal(lagrange.galois(3, coords[0], coords[1], GF_W), 125);
    }
  },

  'y=3x^2+2x+1': {
    topic: [[1, 2, 3], [0, 9, 8]],

    'x=0': function(coords) {
      assert.equal(lagrange.galois(0, coords[0], coords[1], GF_W), 1);
    },

    'x=4': function(coords) {
      assert.equal(lagrange.galois(4, coords[0], coords[1], GF_W), 57);
    }
  }
}).export(module);

vows.describe('base10').addBatch({
  'y=x': {
    topic: [[1, 2, 3], [1, 2, 3]],

    'x=0': function(coords) {
      assert.equal(lagrange.base10(0, coords[0], coords[1]), 0);
    },

    'x=4': function(coords) {
      assert.equal(lagrange.base10(4, coords[0], coords[1]), 4);
    }
  },

  'y=2x+123': {
    topic: [[-2, -1, 1, 2, 4], [119, 121, 125, 127, 131]],

    'x=0': function(coords) {
      assert.equal(lagrange.base10(0, coords[0], coords[1]), 123);
    },

    'x=3': function(coords) {
      assert.equal(lagrange.base10(3, coords[0], coords[1]), 129);
    }
  },

  'y=3x^2+2x+1': {
    topic: [[1, 2, 3], [6, 17, 34]],

    'x=0': function(coords) {
      assert.equal(lagrange.base10(0, coords[0], coords[1]), 1);
    },

    'x=4': function(coords) {
      assert.equal(lagrange.base10(4, coords[0], coords[1]), 57);
    }
  }
}).export(module);

vows.describe('splitCoords').addBatch({
  'Same length': {
    topic: [[1, 1], [2, 2]],

    'good': function(coords) {
      var split = lagrange.splitCoords(coords);

      assert.equal(coords.length, 2);
      assert.equal(split[0].length, coords.length);
      assert.equal(split[1].length, coords.length);
      
      coords.forEach(function(point, idx) {
        assert.equal(point[0], split[0][idx]);
        assert.equal(point[1], split[1][idx]);
      });
    }
  }
}).export(module);
