define([ "specrunner", "bankocr" ], function(specrunner, bankocr) {

  function writeSpecs() {
    describe("Bank OCR module", function() {

      describe("digitize function", function() {
        var digitize = bankocr.digitize;
        it("handles zero", function() {
          expect(digitize(0)).to.deep.equal([ 0 ]);
        });
        it("handles a big number", function() {
          expect(digitize(283529)).to.deep.equal([ 2, 8, 3, 5, 2, 9 ]);
        });
      });

      describe("encode function", function() {
        var encode = bankocr.encode;
        it("handles zero", function() {
          expect(encode(0)).to.equal("" + 
            " _ \n" +
            "| |\n" + 
            "|_|\n");
        });
        it("handles a big number", function() {
          expect(encode(92573)).to.equal("" + 
            " _  _  _  _  _ \n" +
            "|_| _||_   | _|\n" + 
            " _||_  _|  | _|\n");
        });
      });

      describe("calculateChecksum function", function() {
        var calculateChecksum = bankocr.calculateChecksum;
        it("handles zero", function() {
          expect(calculateChecksum("000000000")).to.equal(0);
        });
        it("handles a 9-digit number", function() {
          expect(calculateChecksum("123456789")).to.equal(165);
        });
        it("handles a different 9-digit number", function() {
          expect(calculateChecksum("987654321")).to.equal(285);
        });
      });

      describe("scan function", function() {
        var scan = bankocr.scan;
        it("handle single invalid number", function() {
          var result = scan("" +
            " _  _  _  _  _ \n" +
            "|_| _||_   | _|\n" + 
            " _||_  _|  | _|\n");
          expect(result.length).to.equal(1);
          expect(result[0].sval).to.equal("92573");
          expect(result[0].isLegible).to.equal(false);
          expect(result[0].isValidAccountNumber).to.equal(false);
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
