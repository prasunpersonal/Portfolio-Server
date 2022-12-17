const express = require('express');
const multer = require('multer');
const router = express.Router();
const Certificate = require('../Models/certificateModel');
const fileUpload = require('../Helpers/fileUpload');

router.get('/all', async(req, res) => {
    Certificate.find().then(value => {
        res.json(value.sort((a, b) => new Date(b.certificateDate).getTime() - new Date(a.certificateDate).getTime()));
    }).catch(error => {
        res.json(error);
    });
});

router.get('/:id', async(req, res) => {
    Certificate.find(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.post('/add', multer({storage: multer.memoryStorage()}).single('certificateImage'), async(req, res) => {
    const certificate = new Certificate(req.body);
    certificate.certificateImage = await fileUpload.imageUpload(req.file, 'certificates');
    console.log(certificate.certificateImage);

    // certificate.certificateImage = 'data:' + req.file.mimetype + ';' + 'base64' + ',' + new Buffer.from(req.file.buffer).toString('base64');
    // certificate.save().then(value => {
    //     res.json(value);
    // }).catch(error => {
    //     res.json(error);
    // });
    res.send(certificate.certificateImage);
});

router.patch('/update/:id', async (req, res) => {
    Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Certificate.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

module.exports = router;