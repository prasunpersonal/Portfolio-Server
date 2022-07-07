const mongoose = require('mongoose');

module.exports = mongoose.model('Project', new mongoose.Schema ({
    projectTitle: {type: String, required: true},
    projectDescription: {type: String, required: true},
    projectCategory: {type: String, required: true},
    projectDate: {type: String, required: true},
    githubLink: {type: String, required: true},
    projectThumblailUrl: {type: String, required: false}
}));