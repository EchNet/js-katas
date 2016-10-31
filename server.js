/* server.js */

var express = require("express");
var server = express();
server.set("port", process.env.PORT || 4567);
server.use(express.static("www"));
server.listen(server.get("port"), function () {
  console.log("Listening on port", server.get("port"));
});
