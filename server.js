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

var CONFIG_JS = '' +
  'var require = { \n' +
  '  baseUrl: "/js", \n' +
  '  paths: { \n' +
  '    "jquery": "jquery-' + CONFIG.javascript.jqueryVersion + '" \n' +
  '  }, \n' +
  '  map: { \n' +
  '    "*": { "jquery": "jquery-private" }, \n' +
  '    "jquery-private": { "jquery": "jquery" } \n' +
  '  }, \n' +
  '  deps: [ "app" ], \n' +
  '  callback: function(app) { app(); } \n' +
  '}\n';

function newServer() {
  var express = require("express");
  var server = express();
  server.use(express.static(CONFIG.server.baseDir));
  return server;
}

function handleConfigJs(req, res) {
  res.set("Content-Type", "application/javascript");
  res.send(CONFIG_JS);
}

(function() {
  var server = newServer();
  var port = process.env.PORT || CONFIG.server.port;

  server.set("port", port);

  server.get("/config.js", function(req, res) {
    res.set("Content-Type", "application/javascript");
    res.send(CONFIG_JS);
  });

  server.listen(port, function () {
    console.log("Listening on port", port);
  });
})();
