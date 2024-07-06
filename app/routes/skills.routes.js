module.exports = (app) => {
    const Skills = require("../controllers/skills.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Skills for a Resume
    router.post("/skills/", [authenticateRoute], Skills.create);
  
    //Update a Skills with ID
    router.put("/skills/:id", [authenticateRoute], Skills.update);
  
    //Delete a Skills for resume
    router.delete("/skills/:id", [authenticateRoute], Skills.delete);
  
    // Retrieve a all Skills with id
    router.get("/skills/", Skills.findAll);
  
    // Retrieve a single Skills with id
    router.get("/skills/:id", Skills.findOne);

        
    // Retrieve all skills for user 
    router.get("/users/:userId/skills/", Skills.findAllForUser);

    // // Update a users skills with new id
    // router.put("/users/:userId/skills/:skillsId", [authenticateRoute], Skills.update);

    // // Delete an skills with skills id
    // router.delete("/users/:userId/skills/:skillsId", [authenticateRoute], Skills.delete);

    // // Search for a skills for a specific user
    // router.get("/users/:userId/skills/:skillsId", Skills.findOneForUser);

    app.use("/resumebuilderapi", router);
  
  }; 