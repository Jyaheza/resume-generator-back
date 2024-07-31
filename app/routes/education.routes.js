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
    router.get("/education/", [authenticateRoute], Education.findAll);

    // Retrieve a single Education with id
    router.get("/education/:id", [authenticateRoute], Education.findOne);

    // Retrieve all education for user 
    router.get("/education/user/:userId", [authenticateRoute], Education.findAllForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 