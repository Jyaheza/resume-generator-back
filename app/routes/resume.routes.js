module.exports = (app) => {
    const Resume = require("../controllers/resume.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Setting for a Resume
    router.post("/resume/", 
      [authenticateRoute], 
      Resume.create);
  
    //Update a Resume with ID
    router.put("/resume/:id", [authenticateRoute], Resume.update);
  
    //Delete a Resume for user
    router.delete("/resume/:id", [authenticateRoute], Resume.delete);
  
    // Retrieve a all Resume with id
    router.get("/resume/", Resume.findAll);

    // Retrieve a single Resume with id
    router.get("/resume/:id", Resume.findOne);


    // Retrieve all resume for user 
    router.get("/users/:userId/resume/", Resume.findAllForUser);

    // // Update a users resume with new id
    // router.put("/users/:userId/resume/:resumeId", [authenticateRoute], Resume.update);

    // // Delete an resume with resume id
    // router.delete("/users/:userId/resume/:resumeId", [authenticateRoute], Resume.delete);

    // // Search for a resume for a specific user
    // router.get("/users/:userId/resume/:resumeId", Resume.findOneForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 