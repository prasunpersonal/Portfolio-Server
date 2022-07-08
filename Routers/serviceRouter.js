const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');


router.post('/sendemail', (req, res) => {    
    nodemailer.createTransport(mailgun({auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }})).sendMail({
        to: process.env.GMAIL_ADDRESS,
        from: "Portfolio @ ".concat(req.body.name,' <', req.body.email, '>'),
        subject: req.body.subject,
        text: req.body.text
    }, (e) => {
        if (e) res.json({"message": e.message});
        else res.json({"message": "Mail sent successfully!"});
    });
});

module.exports = router;
