module.exports = function (server) {

    var Zone = require('../models/zone');
    var util = require('../util');

    server.get('zone/list', function (req, res) {
        Zone.find().exec(function (err, zone) {
            res.send(util.message(true, zone));
        });
    });

    server.get('zone/detail', function (req, res) {
        var code = req.params.code;
        Zone.findOne({ code: code }).exec(function (err, data) {
            res.send(util.message(true, data));
        });
    });

    server.get('zone/default', function (req, res) {
        res.send(util.message(true, {}));
    });

    server.post('zone/create', function (req, res) {
        res.send();
    });

    server.post('zone/update', function (req, res) {
        res.send();
    });

    server.post('zone/delete', function (req, res) {
        res.send();
    });
}

