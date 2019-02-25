var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playbookitemsSchema = new Schema({
    name: {type: String, required: true},
    taskPriority: String,
    description: String,
    fullDescription: String,
    createdBy: String,
    whoOwns: String
})

module.exports = mongoose.model('Playbookitems', playbookitemsSchema);
