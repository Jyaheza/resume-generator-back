module.exports = (app) => {
    const Experiences = require("../controllers/experiences.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Experiences for a Resume
    router.post("/experiences/", [authenticateRoute], Experiences.create);
  
    //Update a Experiences with ID
    router.put("/experiences/:id", [authenticateRoute], Experiences.update);
  
    //Delete a Experiences for resume
    router.delete("/experiences/:id", [authenticateRoute], Experiences.delete);
  
    // Retrieve a single Experiences with id
    router.get("/experiences/", Experiences.findAll);

    // Retrieve a single Experiences with id
    router.get("/experiences/:id", Experiences.findOne);

    // Retrieve all experiences for user 
    router.get("/experiences/user/:userId", Experiences.findAllForUser);

    // // Update a users experiences with new id
    // router.put("/users/:userId/experiences/:experiencesId", [authenticateRoute], Experiences.update);

    // // Delete an experiences with experiences id
    // router.delete("/users/:userId/experiences/:experiencesId", [authenticateRoute], Experiences.delete);

    // // Search for a experiences for a specific user
    // router.get("/users/:userId/experiences/:experiencesId", Experiences.findOneForUser);

    app.use("/resumebuilderapi", router);
  
  }; 