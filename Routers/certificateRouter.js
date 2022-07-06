const express = require('express');
const multer = require('multer');
const router = express.Router();
const Certificate = require('../Models/certificateModel');

router.get('/all', async(req, res) => {
    try {
        res.json(await Certificate.find());
    } catch (error) {
        res.json({"Error":error});
    }
});

router.get('/:id', async(req, res) => {
    try {
        res.json(await Certificate.find(req.params.id));
    } catch (error) {
        res.json({"Error":error});
    }
});

router.post('/add', async(req, res) => {
    try {
        res.json(await new Certificate(req.body).save());
    } catch (error) {
        res.json({"Error":error});
    }
});

router.post('/upload/:id', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => { cb(null, './Uploads/certificates') },
        filename: (req, file, cb) => { cb(null, req.params.id.concat('.', file.originalname.split('.').pop())) }
    })
}).single('image'), (req, res) => {
    Certificate.findByIdAndUpdate(req.params.id, { certificateImageUrl: req.protocol.concat('://', req.headers.host, '/uploads/certificates/', req.file.filename) }, (error) => {
        if (error) {
            res.json({ "Error": error });
        } else {
            res.json({ "message": "Image updated successfully" });
        }
    });
});

module.exports = router;