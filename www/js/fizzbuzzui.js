// fizzbuzzui.js

define([ "jquery", "fizzbuzz" ], function($, fizzbuzz) {

  return function(jqSel) {
    for (var n = 1; n <= 100; ++n) {
      var paragraph = $("<p>");
      paragraph.text(fizzbuzz.toString(n));
      $(jqSel).append(paragraph);
    }
  }
});
