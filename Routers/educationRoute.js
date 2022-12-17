const express = require('express');
const router = express.Router();
const Education = require('../Models/educationModel');

router.get('/all', async (req, res) => {
    Education.find().then(value => {
        res.json(value.sort((a,b) => b.startingYear.localeCompare(a.startingYear)));
    }).catch(error => {
        res.json(error);
    });
});

router.post('/add', async (req, res) => {
    new Education(req.body).save().then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.patch('/update/:id', async (req, res) => {
    Education.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Education.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

module.exports = router;