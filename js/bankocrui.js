// bankocrui.js

define([ "jquery", "bankocr" ], function($, bankocr) {

  var encode = bankocr.encode;
  var scan = bankocr.scan;

  return function() {
    var textInput = $("<input>").attr("type", "text");
    var textOutput = $("<textarea>").addClass("fixedwidth").css("width", 480).css("height",120).attr("readonly", true);
    var scratchPad = $("<textarea>").addClass("fixedwidth").css("width", 480).css("height",240);
    var evalDiv = $("<div>");
    var evalTable = $("<table>");

    function updateInputValue() {
      textOutput.text(encode(textInput.val()));
    }

    function updateEvalTable(results) {
      evalTable.find("tr").remove();
      for (var i = 0; i < results.length; ++i) {
        var result = results[i];
        var status = !result.isLegible ? "ILL" : (result.isValidAccountNumber ? "" : "ERR");
        evalTable.append($("<tr>")
          .append($("<td>").text(result.sval))
          .append($("<td>").text(status))
        );
      }
    }

    function updateEvaluation() {
      updateEvalTable(scan(scratchPad.val()));
    }

    textInput.on("change paste keyup", updateInputValue);
    scratchPad.on("change paste keyup", updateEvaluation);

    $("body")
      .append($("<div>").text("Enter a number here:"))
      .append($("<div>").append(textInput))
      .append($("<div>").text("Copy from here:"))
      .append($("<div>").append(textOutput))
      .append($("<div>").text("Paste here:"))
      .append($("<div>").append(scratchPad))
      .append($("<div>").text("Results appear here:"))
      .append($("<div>").append(evalTable));
  }
});
