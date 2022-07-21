const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = {
    imageUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload({
                resource_type: "auto",
                folder: "portfolio/images/".concat(parentFolder),
                public_id: parentFolder.concat('-', Date.now())
            },(error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }).end(file.buffer);
        });
    },
    videoUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: "auto",
                folder: "portfolio/videos/".concat(parentFolder),
                public_id: parentFolder.concat('-', Date.now())
            },(error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }).end(file.buffer);
        })
    }
}