// const cloudinary = require('cloudinary').v2;
const AWS = require("aws-sdk");
const fs = require('fs');
const s3 = new AWS.S3();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
//     secure: true
// });

module.exports = {
    imageUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            s3.upload({
                Bucket: "cyclic-rich-gold-rabbit-gear-ap-southeast-2",
                Key: "portfolio/images/".concat(parentFolder, '/', file.originalname),
                Body: file.buffer,
            }, (err, data) => {
                console.log(err);
                console.log(data);
                if (err) {
                  reject(err)
                }
                resolve(data.Location)
              });


            // cloudinary.uploader.upload_stream({
            //     resource_type: "auto",
            //     folder: "portfolio/images/".concat(parentFolder),
            //     public_id: parentFolder.concat('-', Date.now())
            // },(error, result) => {
            //     if (error) reject(error);
            //     else resolve(result.secure_url);
            // }).end(file.buffer);
        });
    },
    videoUpload: (file, parentFolder) => {
        return new Promise((resolve, reject) => {
            s3.upload({
                Bucket: "cyclic-rich-gold-rabbit-gear-ap-southeast-2",
                Key: "portfolio/videos/".concat(parentFolder, '-', Date.now(), '.', file.filename.split('.')[-1]),
                Body: file.buffer,
            }).promise().then((data)=> {
                resolve(data.Location);
            }).catch((error)=> {
                reject(error);
            });


            // cloudinary.uploader.upload_stream({
            //     resource_type: "auto",
            //     folder: "portfolio/videos/".concat(parentFolder),
            //     public_id: parentFolder.concat('-', Date.now())
            // },(error, result) => {
            //     if (error) reject(error);
            //     else resolve(result.secure_url);
            // }).end(file.buffer);
        })
    }
}