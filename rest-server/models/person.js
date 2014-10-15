var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    position: String,
    phone: String,
    short_phone: String,
    backup_phone: String,
    qq: String,
    email: String,
    comment: String
});

var Person = mongoose.model('persons', personSchema);

module.exports = Person;
