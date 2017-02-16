var path = require("path");
var Builder = require('systemjs-builder');

var builder = new Builder();
builder.loadConfig('./config.js').then(function(){
builder.bundle('./module1/main.js', './m1build/main.js', {
    externals: ['jquery']
})
    // builder.bundle('./module1/main.js', 'm1build/main.js', {
    //     // globalName: 'm1build',
    //     externals: ['jquery'],
    //     globalDeps: {
    //         'jquery': 'jQuery'
    //     }
    // })
})
