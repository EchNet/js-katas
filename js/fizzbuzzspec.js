define([ "specrunner", "fizzbuzz" ], function(specrunner, fizzbuzz) {

  function writeSpecs() {
    describe("Fizz Buzz module", function() {

      describe("version 1 (is multiple of 3 or 5)", function() {
        var fb = fizzbuzz.fizzIfIsFactor;
        it("handles multiples of 3 but not 5", function() {
          expect(fb(3)).to.equal("Fizz");
          expect(fb(6)).to.equal("Fizz");
          expect(fb(9)).to.equal("Fizz");
        });
        it("handles multiples of 5 but not 3", function() {
          expect(fb(5)).to.equal("Buzz");
          expect(fb(10)).to.equal("Buzz");
          expect(fb(20)).to.equal("Buzz");
        });
        it("handles multiples of 15", function() {
          expect(fb(15)).to.equal("FizzBuzz");
          expect(fb(30)).to.equal("FizzBuzz");
          expect(fb(45)).to.equal("FizzBuzz");
        });
        it("handles multiples of neither", function() {
          expect(fb(7)).to.equal("7");
          expect(fb(8)).to.equal("8");
          expect(fb(13)).to.equal("13");
        });
      });

      describe("version 2 (is multiple of 3 or 5 or has 3 or 5 as digit)", function() {
        var fb = fizzbuzz.fizzIfIsFactorOrDigit;
        it("handles multiples of 3 but not 5", function() {
          expect(fb(6)).to.equal("Fizz");
          expect(fb(9)).to.equal("Fizz");
          expect(fb(12)).to.equal("Fizz");
        });
        it("handles multiples of 5 but not 3", function() {
          expect(fb(10)).to.equal("Buzz");
          expect(fb(20)).to.equal("Buzz");
          expect(fb(80)).to.equal("Buzz");
        });
        it("handles multiples of 15", function() {
          expect(fb(15)).to.equal("FizzBuzz");
          expect(fb(30)).to.equal("FizzBuzz");
          expect(fb(45)).to.equal("FizzBuzz");
        });
        it("handles multiples of neither", function() {
          expect(fb(7)).to.equal("7");
          expect(fb(8)).to.equal("8");
          expect(fb(29)).to.equal("29");
        });
        it("handles multiples of neither having 3 as digit", function() {
          expect(fb(31)).to.equal("Fizz");
          expect(fb(32)).to.equal("Fizz");
          expect(fb(34)).to.equal("Fizz");
          expect(fb(103)).to.equal("Fizz");
        });
        it("handles multiples of neither having 5 as digit", function() {
          expect(fb(58)).to.equal("Buzz");
          expect(fb(502)).to.equal("Buzz");
        });
        it("handles multiples of neither having both 3 and 5 as digits", function() {
          expect(fb(350009)).to.equal("FizzBuzz");
        });
      });
    });
  }

  return function() {
    specrunner.init();
    writeSpecs();
    specrunner.run();
  }
});
