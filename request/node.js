
var Http = require("http");
var ChildProcess = require("child_process");
var Request = require("./request.js");
var Url = require("./url.js");

module.exports = function (url) {
  var parts = Url.parse(url);
  return function (method, path, headers, body, callback) {
    var options = Object.assign({headers:headers, path:path, body:body}, parts);
    if (callback)
      return Request(options, callback);
    var child = ChildProcess.spawnSync("node", [__dirname+"/child.js"], {
      encoding: "utf8"
      input: JSON.stringify(options)
    });
    if (child.status !== 0)
      throw new Error(child.stderr);
    return JSON.parse(child.stdout);
  };
};
