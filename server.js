const express = require('express');
const axios = require('axios');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const env = require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "rudi-session",
    secret: "COOKIE_SECRET", 
    httpOnly: true
  })
);


// routes
require('./app/routes/auth.routes')(app);;

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});