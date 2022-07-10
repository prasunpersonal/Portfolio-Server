const cloudinary = require('cloudinary').v2;
const path = require('path');
const DatauriParser = require('datauri/parser');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = {
    imageUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(new DatauriParser().format(path.extname(file.originalname).toString(), file.buffer).content, {
                folder: "portfolio/images/".concat(parentFolder),
                public_id: parentFolder.concat('-', Date.now(), '.', file.originalname.split('.').pop())
            }).then(res => {
                resolve(res.secure_url);
            }).catch(err => {
                reject(err);
            });
        });
    },
    videoUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(new DatauriParser().format(path.extname(file.originalname).toString(), file.buffer).content, {
                folder: "portfolio/videos/".concat(parentFolder),
                public_id: parentFolder.concat('-', Date.now(), '.', file.originalname.split('.').pop())
            }).then(res => {
                resolve(res.secure_url);
            }).catch(err => {
                reject(err);
            });
        });
    }
}