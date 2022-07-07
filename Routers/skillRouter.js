const express = require('express');
const multer = require('multer');
const url = require('url');
const router = express.Router();
const Skill = require('../Models/skillModel');

router.get('/all', async (req, res) => {
    try {
        res.json(await Skill.find());
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/languages-and-frameworks', async (req, res) => {
    try {
        res.json(await Skill.find({ skillCategory: "LanguageAndFramework" }));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/databases', async (req, res) => {
    try {
        res.json(await Skill.find({ skillCategory: "Database" }));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/profiles', async (req, res) => {
    try {
        res.json(await Skill.find({ skillCategory: "Profile" }));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.post('/add', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => { cb(null, './Uploads/skills/') },
        filename: (req, file, cb) => { cb(null,"skill".concat('-', Date.now(), '.', file.originalname.split('.').pop())) }
    })
}).single('skillImage'), async (req, res) => {
    try {
        const skill = new Skill(req.body);
        skill.skillImageUrl = req.protocol.concat('://', req.headers.host, '/uploads/skills/', req.file.filename);
        res.json(await skill.save());
    } catch (error) {
        res.json({ "Error": error });
    }
});

module.exports = router;