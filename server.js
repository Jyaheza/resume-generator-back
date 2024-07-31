require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the resume builder backend." });
});

require("./app/routes/resumedata.routes.js")(app);
require("./app/routes/jobMatch.routes.js")(app);
require("./app/routes/resume.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/experiences.routes.js")(app);
require("./app/routes/education.routes.js")(app);
require("./app/routes/certificates.routes.js")(app);
require("./app/routes/projects.routes.js")(app);
require("./app/routes/skills.routes.js")(app);
require("./app/routes/review.routes.js")(app);
// require("./app/routes/resumes.routes.js")(app);

app.use(express.static(path.join(__dirname, 'dist')));

// Serve the index.html file for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 3201;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}


module.exports = app;