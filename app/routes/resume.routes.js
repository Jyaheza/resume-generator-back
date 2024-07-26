module.exports = (app) => {
    const Resume = require("../controllers/resume.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Setting for a Resume
    router.post("/resumes/", 
      // [authenticateRoute], 
      Resume.create);
  
    //Update a Resume with ID
    router.put("/resumes/:id", [authenticateRoute], Resume.update);
  
    //Delete a Resume for user
    router.delete("/resumes/:id", [authenticateRoute], Resume.delete);
  
    // Retrieve a all Resume with id
    router.get("/resumes/", [authenticateRoute], Resume.findAll);

    router.get("/resumes/meta/user/:id", [authenticateRoute], Resume.findMetaForUser);

    // Retrieve a single Resume with id
    router.get("/resumes/:id", [authenticateRoute], Resume.findOne);

    router.get("/resumes/pdf/:id", [authenticateRoute], Resume.findResumePdfById);

    // Retrieve all resume for user 
    router.get("/resumes/user/:userId", [authenticateRoute], Resume.findAllForUser);

    // // Update a users resume with new id
    // router.put("/users/:userId/resume/:resumeId", [authenticateRoute], Resume.update);

    // // Delete an resume with resume id
    // router.delete("/users/:userId/resume/:resumeId", [authenticateRoute], Resume.delete);

    // // Search for a resume for a specific user
    // router.get("/users/:userId/resume/:resumeId", Resume.findOneForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 