var Main = require("./main.js");

// Main({
//   port:8080,
//   setup: [
//     "if (!window.____setup____) {",
//     "  window.____setup____ = true;",
//     "  alert('SWAGGY');",
//     "}",
//   ].join(""),
//   intercept: function (url) {
//     var counter = 0;
//     return function (js) {
//       console.log(url + " >> " + ++counter)
//       return js;
//     };
//   }
// });

Main({
  input: "./node/main.js",
  output: "./node/bundle.js",
  setup: "./setup.js",
  intercept: function (url) {
    console.log(url);
    return function (js) { return js };
  }
});