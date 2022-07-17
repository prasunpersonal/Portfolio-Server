const mongoose = require('mongoose');

module.exports = mongoose.model('Education', new mongoose.Schema ({
    title: {type: String, required: true},
    organisation: {type: String, required: true},
    completionYear: {type: String},
    description: {type: String}
}));