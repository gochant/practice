"bundle";
System.register("module1/index.html!node_modules/systemjs-plugin-text/text.js", [], function (_export, _context) {
  "use strict";

  var __useDefault;

  return {
    setters: [],
    execute: function () {
      _export("__useDefault", __useDefault = true);

      _export("__useDefault", __useDefault);

      _export("default", "<div>Hello World</div>");
    }
  };
});
(function() {
var define = System.amdDefine;
define("module1/sub.js", [], function() {
  console.log('xxx');
});

})();
(function() {
var define = System.amdDefine;
define("module1/main.js", ["jquery", "./index.html!text", "./sub"], function($, tpl) {
  $('#test').html(tpl);
  return {a: 1};
});

})();