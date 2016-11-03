// bankocr.js

define([], function() {

  var NROWS = 3, NCOLS = 3;

  var ENCODING = [
    " _ " +
    "| |" +
    "|_|",
    "   " +
    "  |" +
    "  |",
    " _ " +
    " _|" +
    "|_ ",
    " _ " +
    " _|" +
    " _|",
    "   " +
    "|_|" +
    "  |",
    " _ " +
    "|_ " +
    " _|",
    " _ " +
    "|_ " +
    "|_|",
    " _ " +
    "  |" +
    "  |",
    " _ " +
    "|_|" +
    "|_|",
    " _ " +
    "|_|" +
    " _|"
  ];

  // Create map of glyph to integer value.
  var DECODER = (function() {
    var decoder = {};
    for (var i = 0; i < ENCODING.length; ++i) {
      decoder[ENCODING[i]] = String(i);
    }
    return decoder;
  })();

  var CHECKSUM_MODULUS = 11;
  var ACCOUNT_NUMBER_LENGTH = 9;

  function digitize(n) {
    var digits = [];
    for (;;) {
      digit = n % 10;
      digits.unshift(digit);
      n = Math.floor(n / 10);
      if (n == 0) break;
    }
    return digits;
  }

  function encode(n) {
    var string = "";
    if (!isNaN(n)) {
      var digits = digitize(n);
      for (var row = 0; row < NROWS; ++row) {
        for (var i = 0; i < digits.length; ++i) {
          string += ENCODING[digits[i]].substring(row * NCOLS, (row + 1) * NCOLS);
        }
        string += "\n";
      }
    }
    return string;
  }

  function nextLines(lines) {
    var tmpLines = null;
    if (lines.length && lines[0].length) {
      tmpLines = [];
      for (var i = 0; i < NROWS; ++i) {
        tmpLines.push(lines.length ? lines.shift() : "");
      }
    }
    return tmpLines;
  }

  function nextGlyph(lines) {
    var glyph = null;
    for (var i = 0; i < lines.length; ++i) {
      if (lines[i].length >= NCOLS) {
        glyph = glyph || "";
        glyph += lines[i].substring(0, NCOLS);
        lines[i] = lines[i].substring(NCOLS);
      }
    }
    return glyph;
  }

  function toGlyphs(lines) {
    var glyphs = [];
    while (g = nextGlyph(lines)) {
      glyphs.push(g);
    }
    return glyphs;
  }

  function toString(glyphs) {
    var sval = "";
    for (var i = 0; i < glyphs.length; ++i) {
      var g = glyphs[i];
      sval += (g in DECODER) ? DECODER[g] : "?";
    }
    return sval;
  }

  function calculateChecksum(sval) {
    var checksum = 0;
    for (var i = 0; i < sval.length; ++i) {
      checksum += parseInt(sval.charAt(i)) * (ACCOUNT_NUMBER_LENGTH - i);
    }
    return checksum;
  }

  function scanOne(lines) {
    var sval = toString(toGlyphs(lines));
    var isLegible = sval.length == ACCOUNT_NUMBER_LENGTH && sval.match(/^[0-9]+$/);
    var checksum = isLegible ? calculateChecksum(sval) : NaN;
    var isValidAccountNumber = isLegible && (checksum % CHECKSUM_MODULUS == 0)
    return {
      sval: sval,
      isLegible: isLegible,
      checksum: checksum,
      isValidAccountNumber: isValidAccountNumber
    };
  }

  function scan(text) {
    var lines = text.split("\n");
    var results = [];
    while (tmpLines = nextLines(lines)) {
      results.push(scanOne(tmpLines));
    }
    return results;
  }

  return {
    digitize: digitize,
    encode: encode,
    calculateChecksum: calculateChecksum,
    scan: scan
  }
});
