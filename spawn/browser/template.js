
var EmitterWebworker = require("antena/emitter/webworker");

var emitter = EmitterWebworker();

emitter.split("/otiluke-webworker-begin").request("GET", "/", {}, "", function (status, reason, header, body) {
  var body = JSON.parse(body);
  VIRUS(body.parameter, emitter, function (error, infect) {
    function done (script) {
      if (body.autoclose) {
        global.process = {};
        global.process.exit = function (code) {
          emitter.split("/otiluke-webworker-end").request("GET", "/", {}, JSON.stringify(code), function () {});
        };
      }
      var result = global.eval(infect(body.source, body.script));
      if (body.autoclose) {
        emitter.split("/otiluke-webworker-end").request("GET", "/", {}, JSON.stringify(result), function () {});
      }
    }
    if (error)
      throw error;
    if ("script" in body)
      return done(body.script);
    var req = new XMLHttpRequest();
    req.open("GET", source);
    req.onload = function () {
      if (req.status !== 200)
        throw new Error("Cannot load "+source+": "+req.status+" "+req.statusText);
      done(req.responseText);
    };
    req.send();
  });
};
