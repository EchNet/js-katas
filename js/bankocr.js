// bankocr.js
// http://codingdojo.org/cgi-bin/index.pl?KataBankOCR User Stories 1 and 2

define([], function() {

  // Glyphs are 3x3 arrays of characters.
  var GLYPH_ROWS = 3, GLYPH_COLS = 3;

  // Glyphs 0-9 as strings of length 9.
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

  // Map glyphs to their integer values.
  var DECODER = (function() {
    var decoder = {};
    for (var i = 0; i < ENCODING.length; ++i) {
      decoder[ENCODING[i]] = String(i);
    }
    return decoder;
  })();

  // Constants for account number validation.
  var CHECKSUM_MODULUS = 11;
  var ACCOUNT_NUMBER_LENGTH = 9;

  // Given a number, create an array of its digits.
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

  // Given a number, render a multi-line encoding in glyph form.
  function encode(n) {
    var string = "";
    if (!isNaN(n)) {
      var digits = digitize(n);
      for (var row = 0; row < GLYPH_ROWS; ++row) {
        for (var i = 0; i < digits.length; ++i) {
          var glyph = ENCODING[digits[i]];
          string += glyph.substring(row * GLYPH_COLS, (row + 1) * GLYPH_COLS);
        }
        string += "\n";
      }
    }
    return string;
  }

  // Strip 3 characters from the front of each of the first 3 strings in the array
  // and concatenate them to form a string of 9 characters.  Return the string, or
  // null if there are no characters remaining.
  function nextGlyph(lines) {
    var glyph = null;
    for (var i = 0; i < Math.min(GLYPH_ROWS, lines.length); ++i) {
      var line = lines[i];
      if (line.length) {
        var seg = line.length >= GLYPH_COLS ? line.substring(0, GLYPH_COLS) : line;
        lines[i] = line.substring(seg.length);
        glyph = (glyph || "") + seg;
      }
    }
    return glyph;
  }

  // Organize the characters of a group of 3 lines into glyph strings of length 9 each.
  function toGlyphs(lines) {
    var glyphs = [];
    while (g = nextGlyph(lines)) {
      glyphs.push(g);
    }
    return glyphs;
  }

  // Convert an array of 9-character glyphs to a digit string.
  function toString(glyphs) {
    var sval = "";
    for (var i = 0; i < glyphs.length; ++i) {
      var g = glyphs[i];
      sval += (g in DECODER) ? DECODER[g] : "?";
    }
    return sval;
  }

  // Compute the checksum of a previously scanned digit string.
  function calculateChecksum(sval) {
    var checksum = 0;
    for (var i = 0; i < sval.length; ++i) {
      checksum += parseInt(sval.charAt(i)) * (ACCOUNT_NUMBER_LENGTH - i);
    }
    return checksum;
  }

  // Scan a multi-line string, treating each group of 3 lines as a possible sequence 
  // of glyphs.  For each, produce the results of the scan as a hash of the following 
  // properties:
  //  .sval                  A string, one character per glyph, either the equivalent
  //                         digit or "?" for an invalid glyph.
  //  .isLegible             A boolean, true if the glyph sequence is of the correct
  //                         length and contains only valid glyphs.
  //  .checksum              If legible, the checksum of the sequence (a number);
  //                         otherwise, NaN.
  //  .isValidAccountNumber  A boolean, true if the checksum passes.
  //
  function scan(text) {
    var lines = text.split("\n");
    var results = [];
    while (lines.length && (lines.length > 1 || lines[0].length)) {
      var sval = toString(toGlyphs(lines));
      var isLegible = sval.length == ACCOUNT_NUMBER_LENGTH && sval.match(/^[0-9]+$/);
      var checksum = isLegible ? calculateChecksum(sval) : NaN;
      var isValidAccountNumber = isLegible && (checksum % CHECKSUM_MODULUS == 0)
      results.push({
        sval: sval,
        isLegible: isLegible,
        checksum: checksum,
        isValidAccountNumber: isValidAccountNumber
      });
      lines.splice(0, GLYPH_COLS);
    }
    return results;
  }

  // Module definition.
  return {
    digitize: digitize,
    encode: encode,
    calculateChecksum: calculateChecksum,
    scan: scan
  }
});
