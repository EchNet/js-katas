/* server.js */

var CONFIG = {
  server: {
    port: 4567,
    baseDir: "."
  },
  javascript: {
    jqueryVersion: "1.7.2",
  }
}

function App(props) {
  this.props = props;
}
App.prototype.generateHtml = function() {
  var appProps = this.props;
  // TODO: figure out Express app.render, take on a template engine, such as Pug.
  return '' +
    '<html>\n' +
    '<head>\n' +
    '<link rel="stylesheet" type="text/css" href="' + appProps.stylesheet + '">\n' +
    '<title>' + appProps.title + '</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<h1>' + appProps.title + '</h1>\n' +
    '</body>\n' +
    '<script>\n' +
    'var require = {\n' +
    '  baseUrl: "/js",\n' +
    '  paths: {\n' +
    '    "jquery": "jquery-' + CONFIG.javascript.jqueryVersion + '",\n' +
    '    "mocha": "../node_modules/mocha/mocha",\n' +
    '    "chai": "../node_modules/chai/chai"\n' +
    '  },\n' +
    '  map: {\n' +
    '    "*": { "jquery": "jquery-private" }, \n' +
    '    "jquery-private": { "jquery": "jquery" } \n' +
    '  },\n' +
    '  deps: [ "' + appProps.main + '" ], \n' +
    '  callback: function(app) { app && app(); } \n' +
    '}\n' +
    '</script>\n' +
    '<script src="js/require.js"></script>\n' +
    '</html>\n'
}

var APPS = {
  "fizz_buzz_1": new App({
    title: "Fizz Buzz Kata 1",
    stylesheet: "css/styles.css",
    main: "fizzbuzzui1"
  }),
  "fizz_buzz_2": new App({
    title: "Fizz Buzz Kata 2",
    stylesheet: "css/styles.css",
    main: "fizzbuzzui2"
  }),
  "fizz_buzz_specs": new App({
    title: "Fizz Buzz Specs",
    stylesheet: "./node_modules/grunt-blanket-mocha/node_modules/mocha/mocha.css",
    main: "fizzbuzzspec"
  }),
  "bank_ocr_ui": new App({
    title: "Bank OCR UI",
    stylesheet: "css/styles.css",
    main: "bankocrui"
  }),
  "bank_ocr_specs": new App({
    title: "Bank OCR Specs",
    stylesheet: "./node_modules/grunt-blanket-mocha/node_modules/mocha/mocha.css",
    main: "bankocrspec"
  })
}

function newServer() {
  var express = require("express");
  var server = express();
  server.use(express.static(CONFIG.server.baseDir));
  return server;
}

function handleAppHtml(req, res) {
  var appKey = req.query.app;
  if (!(appKey in APPS)) {
    res.sendStatus(404);
  }
  else {
    res.set("Content-Type", "text/html");
    res.send(APPS[appKey].generateHtml());
  }
}

(function() {
  var server = newServer();

  var port = process.env.PORT || CONFIG.server.port;
  server.set("port", port);

  server.get("/kata.html", handleAppHtml);

  server.listen(port, function () {
    console.log("Listening on port", port);
  });
})();
