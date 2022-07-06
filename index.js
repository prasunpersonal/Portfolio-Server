require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if(error) {
        console.log("Error: "+error);
    } else {
        console.log("Connected to server!");
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static('Uploads'))
app.use('/projects', require('./Routers/projectRouter'));
app.use('/skills', require('./Routers/skillRouter'));
app.use('/certificates', require('./Routers/certificateRouter'));

app.listen(port, () => {
    console.log('Server running on port ' + port);
});