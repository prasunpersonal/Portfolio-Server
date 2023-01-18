const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../Models/projectModel');
const fileUpload = require('../Helpers/fileUpload');

router.get('/all', async (req, res) => {
    Project.find().then(value => {
        res.json(value.sort((a, b) => new Date(b.projectDate).getTime() - new Date(a.projectDate).getTime()));
    }).catch(error => {
        res.send(error.message);
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
        res.send(error.message);
    });
});

router.get('/:id', async (req, res) => {
    Project.findById(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.post('/add', multer({storage: multer.memoryStorage()}).single('projectVideo'), async (req, res) => {
    fileUpload(req.file, 'projects').then(value => {
        const project = new Project(req.body);
        project.projectVideo = value;
        project.save().then(p => {
            res.json(p);
        }).catch(error => {
            res.send(error.message);
        });
    }).catch(error => {
        res.send(error.message);
    });
});

router.patch('/update/:id', async (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Project.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.send(error.message);
    });
});

module.exports = router;