const express = require('express');
const multer = require('multer');
const router = express.Router();
const Project = require('../Models/projectModel');

router.get('/all', async (req, res) => {
    try {
        res.json(await Project.find());
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = new Set();
        (await Project.find()).forEach(project => {
            categories.add(project.projectCategory);
        });
        res.json(Array.from(categories));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await Project.find(req.params.id));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.post('/add', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => { cb(null, './Uploads/projects') },
        filename: (req, file, cb) => { cb(null, "project".concat('-', Date.now(), '.', file.originalname.split('.').pop())) }
    })
}).single('projectThumblail'), async (req, res) => {
    try {
        const project = new Project(req.body);
        project.projectThumblailUrl = req.protocol.concat('://', req.headers.host, '/uploads/projects/', req.file.filename);
        res.json(await project.save());
    } catch (error) {
        res.json({ "Error": error });
    }
});

module.exports = router;