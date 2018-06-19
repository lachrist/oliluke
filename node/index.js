
const Fs = require("fs");
const Path = require("path");
const Module = require("module");
const Antena = require("antena/node");

// https://github.com/nodejs/node/blob/v10.x/lib/internal/modules/cjs/helpers.js
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = (Virus, command, antena_options, virus_options) => {
  process.argv = ["node"].concat(command);
  Virus(antena_options && antena_options.host ? new Antena(antena_options.host, antena_options.secure) : null, virus_options, (error, transform) => {
    if (error)
      throw error;
    // https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js
    Module._extensions[".js"] = function (module, filename) {
      var content = Fs.readFileSync(filename, "utf8");
      module._compile(stripBOM(transform(content, filename)), filename);
    };
    require(Path.resolve(process.argv[1]));
  });
};
