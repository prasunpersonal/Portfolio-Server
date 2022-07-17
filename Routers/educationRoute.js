const express = require('express');
const router = express.Router();
const Education = require('../Models/educationModel');

router.get('/all', async (req, res) => {
    try {
        res.json((await Education.find()).sort((a,b) => b.completionYear.localeCompare((a.completionYear) ? a.completionYear : new Date().getFullYear)));
    } catch (error) {
        res.json(error);
    }
});

router.post('/add', async (req, res) => {
    try {
        res.json(await new Education(req.body).save());
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;