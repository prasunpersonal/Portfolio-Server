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
        const catagoryMap = new Map();
        (await Project.find()).forEach(project => {
            const key = project.projectCategory;
            const subCategories = new Set(catagoryMap.get(key));
            if (project.projectSubCategory) subCategories.add(project.projectSubCategory);
            catagoryMap.set(key, Array.from(subCategories).sort());
        });
        res.json(Object.fromEntries(catagoryMap));
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

router.post('/add', async (req, res) => {
    try {
        res.json(await new Project(req.body).save());
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.post('/upload/:id', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => { cb(null, './Uploads/projects') },
        filename: (req, file, cb) => { cb(null, req.params.id.concat('.', file.originalname.split('.').pop())) }
    })
}).single('image'), (req, res) => {
    Project.findByIdAndUpdate(req.params.id, { projectThumblailUrl: req.protocol.concat('://', req.headers.host, '/uploads/projects/', req.file.filename) }, (error) => {
        if (error) {
            res.json({ "Error": error });
        } else {
            res.json({ "message": "Image updated successfully" });
        }
    });
});

module.exports = router;