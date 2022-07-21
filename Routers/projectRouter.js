const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../Models/projectModel');
const fileUploadHelper = require('../Helpers/fileUpload');

router.get('/all', async (req, res) => {
    try {
        res.json((await Project.find()).sort((a, b) => new Date(b.certificateDate).getTime() - new Date(a.certificateDate).getTime()));
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
        res.json(Array.from(categories).sort());
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

router.post('/add', multer({storage: multer.memoryStorage()}).single('projectVideo'), async (req, res) => {
    try {
        const project = new Project(req.body);
        project.projectVideoUrl = await fileUploadHelper.videoUpload(req.file, "projects");
        res.json(await project.save());
    } catch (error) {
        res.json({ "Error": error });
    }
});

module.exports = router;