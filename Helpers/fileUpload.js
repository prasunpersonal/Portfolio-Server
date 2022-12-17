// const cloudinary = require('cloudinary').v2;
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

s3.getBucketAcl({Bucket: process.argv[2]}, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else if (data) {
        console.log("Success", data.Grants);
    }
});

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
                Bucket: process.env.BUCKET,
                Key: "portfolio/images/".concat(parentFolder, '/', file.originalname),
                Body: file.buffer,
            }).promise().then((data) => {
                console.log(data);
                resolve(data.Location);
            }).catch((error) => {
                reject(error);
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
                Bucket: BUCKET_NAME,
                Key: "portfolio/videos/".concat(parentFolder, '/', file.originalname),
                Body: file.buffer,
            }).promise().then((data) => {
                resolve(data.Location);
            }).catch((error) => {
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