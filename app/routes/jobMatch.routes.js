module.exports = (app) => {
    const jobMatch = require("../controllers/jobMatch.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Get a job match for a resume and job description
    router.get(
      "/jobMatch/",
      // [authenticateRoute], TODO - Put this back in once user table is in place.
      jobMatch.get
    );
  
    app.use("/resumebuilderapi", router);

  }; 