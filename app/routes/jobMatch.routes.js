module.exports = (app) => {
  const jobMatch = require("../controllers/jobMatch.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Get a job match for a resume and job description
  router.post(
    "/jobMatch/:id",
    [authenticateRoute],
    jobMatch.get
  );

  app.use("/resumebuilderapi", router);

}; 