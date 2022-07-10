const express = require('express');
const multer = require('multer');
const router = express.Router();
const Skill = require('../Models/skillModel');
const fileUploadHelper = require('../Helpers/fileUpload');

router.get('/all', async (req, res) => {
    try {
        res.json((await Skill.find()).sort((a, b) => a.skillName.localeCompare(b.skillName)));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/languages-and-frameworks', async (req, res) => {
    try {
        res.json((await Skill.find({ skillCategory: "LanguageAndFramework" })).sort((a, b) => a.skillName.localeCompare(b.skillName)));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/databases', async (req, res) => {
    try {
        res.json((await Skill.find({ skillCategory: "Database" })).sort((a, b) => a.skillName.localeCompare(b.skillName)));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.get('/profiles', async (req, res) => {
    try {
        res.json((await Skill.find({ skillCategory: "Profile" })).sort((a, b) => a.skillName.localeCompare(b.skillName)));
    } catch (error) {
        res.json({ "Error": error });
    }
});

router.post('/add', multer({storage: multer.memoryStorage()}).single('skillImage'), async (req, res) => {
    try {
        const skill = new Skill(req.body);
        skill.skillImageUrl = await fileUploadHelper.imageUpload(req.file, "skills");
        res.json(await skill.save());
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;