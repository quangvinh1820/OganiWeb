const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const route = require('./routes/index.js');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const app = express();
const port = 3001;

dotenv.config();

//Middlewares
app.use(
    express.urlencoded({
      extended: true,
    }),
);
  
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(morgan('combined'));

  // On Cloud
mongoose
    .connect(process.env.MONGO_URI, {
      writeConcern: { w: 'majority' },
    })
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
      console.log(err);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});