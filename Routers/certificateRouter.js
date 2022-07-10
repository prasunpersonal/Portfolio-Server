const express = require('express');
const multer = require('multer');
const router = express.Router();
const Certificate = require('../Models/certificateModel');
const fileUploadHelper = require('../Helpers/fileUpload');

router.get('/all', async(req, res) => {
    try {
        res.json((await Certificate.find()).sort((a, b) => b.certificateDate.localeCompare(a.certificateDate)));
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

router.post('/add', multer({storage: multer.memoryStorage()}).single('certificateImage'), async(req, res) => {
    try {
        const certificate = new Certificate(req.body);
        certificate.certificateImageUrl = await fileUploadHelper.imageUpload(req.file, "certificates");
        res.json(await certificate.save());
    } catch (error) {
        res.json({"Error":error});
    }
});

module.exports = router;