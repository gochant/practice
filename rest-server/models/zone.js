var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zoneSchema = new Schema({
    code: String,
    fullcode: String,
    name: String,
    fullname: String,
    level: String
});

var Zone = mongoose.model('zones', zoneSchema);

module.exports = Zone;
