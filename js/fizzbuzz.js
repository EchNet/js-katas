// fizzbuzz.js

define([ "jquery", ], function($) {

  var BOTTOM = 1, TOP = 100;

  function isFactor(n, m) {
    return n % m === 0;
  }

  function hasDigit(n, m) {
    for (n = Math.abs(Math.floor(n)); n != 0; n = Math.floor(n / 10)) {
      if (n % 10 == m) {
        return true;
      }
    }
    return false;
  }

  function isFactorOrHasDigit(n, m) {
    return isFactor(n, m) || hasDigit(n, m);
  }

  function fizzbuzz(n, fizzFunc) {
    var fizz = fizzFunc(n, 3);
    var buzz = fizzFunc(n, 5);
    return (!fizz && !buzz) ? String(n) : (fizz ? "Fizz" : "") + (buzz ? "Buzz" : "");
  }

  function run(jqSel, fbFunc) {
    for (var n = BOTTOM; n <= TOP; ++n) {
      var paragraph = $("<p>");
      paragraph.text(fizzbuzz(n, fbFunc));
      $(jqSel).append(paragraph);
    }
  }

  return {
    v1: function(jqSel) {
      run(jqSel, isFactor);
    },
    v2: function(jqSel) {
      run(jqSel, isFactorOrHasDigit);
    }
  }
});
