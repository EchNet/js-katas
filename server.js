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

function newServer() {
  var express = require("express");
  var server = express();
  server.use(express.static(CONFIG.server.baseDir));
  return server;
}

function handleConfigJs(req, res) {
  var main = req.query.main || "app";
  var configJs = '' +
    'var require = { \n' +
    '  baseUrl: "/js", \n' +
    '  paths: { \n' +
    '    "jquery": "jquery-' + CONFIG.javascript.jqueryVersion + '" \n' +
    '  }, \n' +
    '  map: { \n' +
    '    "*": { "jquery": "jquery-private" }, \n' +
    '    "jquery-private": { "jquery": "jquery" } \n' +
    '  }, \n' +
    '  deps: [ "' + main + '" ], \n' +
    '  callback: function(app) { app && app(); } \n' +
    '}\n';
  res.set("Content-Type", "application/javascript");
  res.send(configJs);
}

(function() {
  var server = newServer();

  var port = process.env.PORT || CONFIG.server.port;
  server.set("port", port);

  server.get("/config.js", handleConfigJs);

  server.listen(port, function () {
    console.log("Listening on port", port);
  });
})();
