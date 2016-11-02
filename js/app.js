// app.js

define([ "jquery", "fizzbuzz", "bankocr" ], function($, fizzbuzz, bankocr) {

  var OPTIONS = {
    "Fizz Buzz": fizzbuzz.v1,
    "Fizz Buzz (version 2)": fizzbuzz.v2,
    "Bank OCR": bankocr.ui
  }

  function makeModuleRunner(module) {
    return function() {
      $("#output").empty();
      module("#output");
    }
  }

  function selectTab() {
    $(".tab").removeClass("selected");
    $(this).addClass("selected");
  }

  return function() {
    var tabsDiv = $("<div>");

    for (var key in OPTIONS) {
      var module = OPTIONS[key];
      tabsDiv.append($("<span>").addClass("tab").text(key).click(makeModuleRunner(module)).click(selectTab));
    }

    $("body").append(tabsDiv).append($("<div>").attr("id", "output"));
  }
});
