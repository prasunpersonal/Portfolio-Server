const express = require('express');
const multer = require('multer');
const router = express.Router();
const Certificate = require('../Models/certificateModel');
const fileUpload = require('../Helpers/fileUpload');

router.get('/all', async(req, res) => {
    Certificate.find().then(value => {
        res.json(value.sort((a, b) => new Date(b.certificateDate).getTime() - new Date(a.certificateDate).getTime()));
    }).catch(error => {
        res.send(error.message);
    });
});

router.get('/:id', async(req, res) => {
    Certificate.find(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.post('/add', multer({storage: multer.memoryStorage()}).single('certificateImage'), async(req, res) => {
    fileUpload(req.file, 'certificates').then(value => {
        const certificate = new Certificate(req.body);
        certificate.certificateImage = value; 
        certificate.save().then(c => {
            res.json(c);
        }).catch(error => {
            res.send(error.message);
        });
    }).catch(error => {
        res.send(error.message);
    });
});

router.patch('/update/:id', async (req, res) => {
    Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Certificate.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

module.exports = router;