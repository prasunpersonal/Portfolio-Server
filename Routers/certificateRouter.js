const express = require('express');
const multer = require('multer');
const router = express.Router();
const Certificate = require('../Models/certificateModel');

router.get('/all', async(req, res) => {
    try {
        res.json(await Certificate.find().sort((a, b) => b.certificateDate.localeCompare(a.certificateDate)));
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

router.post('/add', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => { cb(null, './Uploads/certificates') },
        filename: (req, file, cb) => { cb(null, 'certificate'.concat('-', Date.now(), '.', file.originalname.split('.').pop())) }
    })
}).single('certificateImage'), async(req, res) => {
    try {
        const certificate = new Certificate(req.body);
        certificate.certificateImageUrl = req.protocol.concat('://', req.headers.host, '/uploads/certificates/', req.file.filename);
        res.json(await certificate.save());
    } catch (error) {
        res.json({"Error":error});
    }
});

module.exports = router;