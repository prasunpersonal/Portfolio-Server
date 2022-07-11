const mongoose = require('mongoose');

module.exports = mongoose.model('Education', new mongoose.Schema ({
    startingYear: {type: String, required: true},
    endingYear: {type: String},
    title: {type: String, required: true},
    description: {type: String}
}));