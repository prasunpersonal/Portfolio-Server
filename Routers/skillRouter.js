const express = require('express');
const multer = require('multer');
const router = express.Router();
const Skill = require('../Models/skillModel');

router.get('/all', async (req, res) => {
    Skill.find().then(value => {
        res.json(value.sort((a, b) => a.skillName.localeCompare(b.skillName)));
    }).catch(error => {
        res.json(error);
    });
});

router.get('/languages-and-frameworks', async (req, res) => {
    Skill.find({ skillCategory: "LanguageAndFramework" }).then(value => {
        res.json(value.sort((a, b) => a.skillName.localeCompare(b.skillName)));
    }).catch(error => {
        res.json(error);
    });
});

router.get('/databases', async (req, res) => {
    Skill.find({ skillCategory: "Database" }).then(value => {
        res.json(value.sort((a, b) => a.skillName.localeCompare(b.skillName)));
    }).catch(error => {
        res.json(error);
    });
});

router.get('/profiles', async (req, res) => {
    Skill.find({ skillCategory: "Profile" }).then(value => {
        res.json(value.sort((a, b) => a.skillName.localeCompare(b.skillName)));
    }).catch(error => {
        res.json(error);
    });
});

router.post('/add', multer({storage: multer.memoryStorage()}).single('skillImage'), async (req, res) => {
    const skill = new Skill(req.body);
    skill.skillImage = 'data:' + req.file.mimetype + ';' + 'base64' + ',' + new Buffer.from(req.file.buffer).toString('base64');
    skill.save().then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
})

router.patch('/update/:id', async (req, res) => {
    Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

router.delete('/delete/:id', async (req, res) => {
    Skill.findByIdAndDelete(req.params.id).then(value => {
        res.json(value);
    }).catch(error => {
        res.json(error);
    });
});

module.exports = router;