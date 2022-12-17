const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../Models/projectModel');

router.get('/all', async (req, res) => {
    Project.find().then(value => {
        res.json(value.sort((a, b) => new Date(b.projectDate).getTime() - new Date(a.projectDate).getTime()));
    }).catch(error => {
        res.json(error);
    });
});

router.get('/categories', async (req, res) => {
    console.log(req.body);
    Project.find().then(value => {
        const categories = new Set();
        value.forEach(project => {
            categories.add(project.projectCategory);
        });
        res.json(Array.from(categories).sort());
    }).catch(error => {
        res.json(error);
    });
});

router.get('/:id', async (req, res) => {
    Project.findById(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.post('/add', multer({storage: multer.memoryStorage()}).single('projectVideo'), async (req, res) => {
    const project = new Project(req.body);
    project.projectVideo = 'data:' + req.file.mimetype + ';' + 'base64' + ',' + new Buffer.from(req.file.buffer).toString('base64');
    project.save().then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.patch('/update/:id', async (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Project.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

module.exports = router;