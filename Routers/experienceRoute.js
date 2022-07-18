const express = require('express');
const router = express.Router();
const Experience = require('../Models/experienceModel');

router.get('/all', async (req, res) => {
    try {
        res.json((await Experience.find()).sort((a,b) => b.startingYear.localeCompare(a.startingYear)));
    } catch (error) {
        res.json(error);
    }
});

router.post('/add', async (req, res) => {
    try {
        res.json(await new Experience(req.body).save());
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;