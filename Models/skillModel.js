const mongoose = require('mongoose');

module.exports = mongoose.model('Skill', new mongoose.Schema ({
    skillName: {type: String, required: true},
    skillCategory: {type: String, required: true},
    skillLink: {type: String, required: false},
    skillImageUrl: {type: String, required: false}
}));