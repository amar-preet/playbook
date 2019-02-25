var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playbooksSchema = new Schema({
    title: {type: String, required: true},
    favorite: Boolean,
	required: Boolean,
    items: [],
    titlecolor: String,
    username: String,
    priority: String,
    status: String
})

module.exports = mongoose.model('Playbooks', playbooksSchema);
