const express = require('express');
const router = express.Router();
const Education = require('../Models/educationModel');

router.get('/all', async (req, res) => {
    Education.find().then(value => {
        res.json(value.sort((a,b) => b.startingYear.localeCompare(a.startingYear)));
    }).catch(error => {
        res.send(error.message);
    });
});

router.get('/:id', async (req, res) => {
    Education.findById(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.post('/add', async (req, res) => {
    new Education(req.body).save().then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.patch('/update/:id', async (req, res) => {
    Education.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Education.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

module.exports = router;