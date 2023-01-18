const express = require('express');
const router = express.Router();
const Experience = require('../Models/experienceModel');

router.get('/all', async (req, res) => {
    Experience.find().then(value => {
        res.json(value.sort((a,b) => b.startingYear.localeCompare(a.startingYear)));
    }).catch(error => {
        res.send(error.message);
    });
});

router.get('/:id', async (req, res) => {
    Experience.findById(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.post('/add', async (req, res) => {
    new Experience(req.body).save().then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.patch('/update/:id', async (req, res) => {
    Experience.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Experience.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

module.exports = router;