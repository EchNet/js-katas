// fizzbuzz.js

define([], function() {

  function fb(n) {
    n = Math.floor(n);      // force to integer
    return {
      n: n,
      fizz: n % 3 === 0,
      buzz: n % 5 === 0
    };
  }

  function fbToString(fb) {
    return (!fb.fizz && !fb.buzz) ? String(fb.n) : (fb.fizz ? "Fizz" : "") + (fb.buzz ? "Buzz" : "")
  }

  function toString(n) {
    return typeof n === "number" ? fbToString(fb(n)) : String(fb);
  }

  return {
    toString: toString
  }
});
