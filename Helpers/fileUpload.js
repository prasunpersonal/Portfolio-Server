const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

const fileUpload = (file, parentFolder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder: "portfolio/".concat(parentFolder),
            public_id: parentFolder.concat('-', Date.now())
        },(error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
        }).end(file.buffer);
    });
}

module.exports = fileUpload;