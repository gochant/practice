var restify = require('restify');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project_m');

var ports = ['./ports/zone'];

var server = restify.createServer();
server.use(restify.queryParser());

for (var i = 0, len = ports.length; i < len; i++) {
    (require(ports[i]))(server);
}

server.get(/\/?.*/, restify.serveStatic({
    directory: '../',
    'default': 'index.html'
}));
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: './public'
}));

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
