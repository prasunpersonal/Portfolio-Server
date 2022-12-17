const mongoose = require('mongoose');

module.exports = mongoose.model('Certificate', new mongoose.Schema ({
    certificateId: {type: String, required: true},
    certificateName: {type: String, required: true},
    certificateOrganization: {type: String, required: true},
    certificateDate: {type: String, required: true},
    certificateLink: {type: String, required: true},
    certificateImage: {type: String, required: true}
}));