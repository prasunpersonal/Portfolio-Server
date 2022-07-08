const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/sendemail', (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        to: "prasunsarkar.personal@gmail.com",
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.text
    };
    
    transporter.sendMail(mailOptions, (e) => {
        if (e) res.json({"message": e});
        else res.json({"message": "Mail sent successfully!"});
    });
});

module.exports = router;
