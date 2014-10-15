var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    type: String,
    address: String,
    zone: String,
    tag: [String],
    amount: Number,
    progress: Number,
    persons: [{
        _id: Schema.Types.ObjectId,
        role: String
    }]
});

var Project = mongoose.model('projects', projectSchema);

module.exports = Project;
