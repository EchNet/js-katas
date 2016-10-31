// app.js

define([ "jquery", "fizzbuzzui" ], function($, fizzbuzzui) {

  var OPTIONS = {
    "Fizz Buzz": fizzbuzzui
  }

  function makeModuleRunner(module) {
    return function() {
      $("#output").empty();
      module("#output");
    }
  }

  return function() {
    var tabsDiv = $("<div>");

    for (var key in OPTIONS) {
      var module = OPTIONS[key];
      tabsDiv.append($("<span>").addClass("tab").text(key).click(makeModuleRunner(module)));
    }

    $("body").append(tabsDiv).append($("<div>").attr("id", "output"));
  }
});
