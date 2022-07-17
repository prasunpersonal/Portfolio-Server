const mongoose = require('mongoose');

module.exports = mongoose.model('Education', new mongoose.Schema ({
    title: {type: String, required: true},
    startingYear: {type: String, required: true},
    completionYear: {type: String},
    organisation: {type: String, required: true},
    description: {type: String}
}));