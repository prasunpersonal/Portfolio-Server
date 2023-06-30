const express = require('express');
const router = express.Router();
const Mailgun = require('mailgun.js');

router.post('/sendemail', (req, res) => {
    new Mailgun(require('form-data')).client({
        username: 'prasunpersonal',
        key: process.env.MAILGUN_API_KEY
    }).messages.create(process.env.MAILGUN_DOMAIN, {
        to: process.env.GMAIL_ADDRESS,
        from: "Portfolio @ ".concat(req.body.name, ' <', req.body.email, '>'),
        subject: req.body.subject,
        text: req.body.text
    }).then((val) => {
        res.status(200).json({ "status": true, "message": "Mail sent successfully!" });
    }).catch((err) => {
        res.status(400).json({ "status": false, "message": err.message });
    });
});

module.exports = router;