const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = {
    imageUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path, {
                folder: "images/".concat(parentFolder),
                public_id: file.filename
            }).then(res => {
                resolve(res.secure_url);
            }).catch(err => {
                reject(err);
            });
        });
    },
    videoUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path, {
                folder: "videos/".concat(parentFolder),
                public_id: file.filename
            }).then(res => {
                resolve(res.secure_url);
            }).catch(err => {
                reject(err);
            });
        });
    }
}