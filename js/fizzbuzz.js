// fizzbuzz.js
// http://codingdojo.org/cgi-bin/index.pl?KataFizzBuzz Parts 1 and 2

define([], function() {

  var FIZZ_FACTOR = 3, BUZZ_FACTOR = 5;
  var FIZZ_STR = "Fizz", BUZZ_STR = "Buzz";

  // Return true if m is a factor of n.
  function isFactor(n, m) {
    return n % m === 0;
  }

  // Return true if m appears as a base10 digit of n.
  function isDigit(n, m) {
    for (n = Math.abs(Math.floor(n)); n != 0; n = Math.floor(n / 10)) {
      if (n % 10 == m) {
        return true;
      }
    }
    return false;
  }

  // Return true if m is a factor or appears as a base10 digit of n.
  function isFactorOrDigit(n, m) {
    return isFactor(n, m) || isDigit(n, m);
  }

  // Return the given value, or replace it with "Fizz", "Buzz" or "FizzBuzz" as appropriate.
  function fizzbuzzer(n, fizzFunc) {
    var fizz = fizzFunc(n, FIZZ_FACTOR);
    var buzz = fizzFunc(n, BUZZ_FACTOR);
    return (!fizz && !buzz) ? String(n) : (fizz ? FIZZ_STR : "") + (buzz ? BUZZ_STR : "");
  }

  // The fizz-buzz function, version 1.
  function fizzIfIsFactor(n) {
    return fizzbuzzer(n, isFactor);
  }

  function fizzIfIsFactorOrDigit(n) {
    return fizzbuzzer(n, isFactorOrDigit);
  }

  return {
    fizzIfIsFactor: fizzIfIsFactor,
    fizzIfIsFactorOrDigit: fizzIfIsFactorOrDigit
  }
});
