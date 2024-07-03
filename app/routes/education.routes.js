module.exports = (app) => {
    const Education = require("../controllers/education.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Education for a Resume
    router.post("/education/", [authenticateRoute], Education.create);
  
    //Update a Education with ID
    router.put("/education/:id", [authenticateRoute], Education.update);
  
    //Delete a Education for resume
    router.delete("/education/:id", [authenticateRoute], Education.delete);
  
    // Retrieve a all Education with id
    router.get("/education/", Education.findAll);

    // Retrieve a single Education with id
    router.get("/education/:id", Education.findOne);

    
    // Retrieve all education for user 
    router.get("/users/:userId/education/", Education.findAllForUser);

    // // Update a users education with new id
    // router.put("/users/:userId/education/:educationId", [authenticateRoute], Education.update);

    // // Delete an education with education id
    // router.delete("/users/:userId/education/:educationId", [authenticateRoute], Education.delete);

    // // Search for a education for a specific user
    // router.get("/users/:userId/education/:educationId", Education.findOneForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 