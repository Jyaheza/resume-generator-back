module.exports = (app) => {
    const ResumeData = require("../controllers/resumedata.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new resume data for a Resume
    router.post("/resumedata/", [authenticateRoute], ResumeData.create);
  
    //Update a Resume data with ID
    router.put("/resumedata/:id", [authenticateRoute], ResumeData.update);
  
    //Delete a resume data for resume
    router.delete("/resumedata/:id", [authenticateRoute], ResumeData.delete);
  
    // Retrieve a all resume data with id
    router.get("/resumedata/", ResumeData.findAll);

    // Retrieve a single resume data with id
    router.get("/resumedata/:id", Resumedata.findOne); 
    
    
    // Retrieve all resumedata for user 
    router.get("/users/:userId/resumedata/", Resumedata.findAllForUser);

    // // Update a users resumedata with new id
    // router.put("/users/:userId/resumedata/:resumedataId", [authenticateRoute], Resumedata.update);

    // // Delete an resumedata with resumedata id
    // router.delete("/users/:userId/resumedata/:resumedataId", [authenticateRoute], Resumedata.delete);

    // // Search for a resumedata for a specific user
    // router.get("/users/:userId/resumedata/:resumedataId", Resumedata.findOneForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 