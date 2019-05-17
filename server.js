const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  }) 
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const port = process.env.PORT; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));