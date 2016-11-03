// fizzbuzzui2.js

define([ "jquery", "fizzbuzz" ], function($, fizzbuzz) {

  var BOTTOM = 1, TOP = 100;

  var fb = fizzbuzz.fizzIfIsFactorOrDigit;

  return function() {
    for (var n = BOTTOM; n <= TOP; ++n) {
      $("body").append($("<div>").addClass("small").text(fb(n)));
    }
  }
});
