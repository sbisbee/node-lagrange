var vows = require('vows');
var assert = require('assert');

var lagrange = require('../src/lagrange.js');

var GF_W = 8;

vows.describe('Lagrange Interpolation').addBatch({
  'y=x': {
    topic: [[1,1], [2,2], [3,3]],

    'x=0': function(coords) {
      assert.equal(lagrange(GF_W, 0, coords), 0);
    },

    'x=4': function(coords) {
      assert.equal(lagrange(GF_W, 4, coords), 4);
    }
  },

  'y=2x+123': {
    topic: [[1, 121], [2, 127], [4, 115]],

    'x=0': function(coords) {
      assert.equal(lagrange(GF_W, 0, coords), 123);
    },

    'x=3': function(coords) {
      assert.equal(lagrange(GF_W, 3, coords), 125);
    }
  },

  'y=3x^2+2x+1': {
    topic: [[1, 0], [2, 9], [3, 8]],

    'x=0': function(coords) {
      assert.equal(lagrange(GF_W, 0, coords), 1);
    },

    'x=4': function(coords) {
      assert.equal(lagrange(GF_W, 4, coords), 57);
    }
  }
}).export(module);
