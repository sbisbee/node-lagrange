node-lagrange
=============

Implements Lagrange polynomial interpolation for both the numbers you are used
to as well as finite fields. Given a list of x values and a list of y values,
it will attempt to solve f(x) for a given x value.

All finite field arithmetic uses the
[galois](https://github.com/sbisbee/node-galois) NPM module (`npm show
galois`).

Functions
---------

  - `base10(x, xValues, yValues)` - Assumes the standard decimal system.

  - `galois(x, xValues, yValues, gfW)` - The `gfW` parameter is passed to the
    `galois` module functions, which uses it as the exponent to define the
    field size (`2^w`).

  - `splitCoords(coords)` - The above math functions take two separate arrays,
    one for x values and one for y values, but your application is likely to
    use an array of tuples to define coordinates. This utility function splits
    them out, giving you a tuple of x and y values (`[xValues, yValues]`).

Examples
--------

See `./tests/lagrange.js` for examples using different equations.
