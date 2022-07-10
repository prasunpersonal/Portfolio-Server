const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

require('dotenv').config();
require("cloudinary").config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
  });

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log("Error: " + error);
    } else {
        console.log("Connected to server!");
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/projects', require('./Routers/projectRouter'));
app.use('/skills', require('./Routers/skillRouter'));
app.use('/certificates', require('./Routers/certificateRouter'));
app.use('/services', require('./Routers/serviceRouter'));

app.listen(port, () => {
    console.log('Server running on port ' + port);
});