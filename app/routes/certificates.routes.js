module.exports = (app) => {
    const Certificates = require("../controllers/certificates.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new certificates for a Resume
    router.post("/certificates/", [authenticateRoute], Certificates.create);
  
    //Update a certificates with ID
    router.put("/certificates/:id", [authenticateRoute], Certificates.update);
  
    //Delete a certificates for resume
    router.delete("/certificates/:id", [authenticateRoute], Certificates.delete);
  
    // Retrieve a all certificates with id
    router.get("/certificates/", Certificates.findAll);

    // Retrieve a single certificate with id
    router.get("/certificates/:id", Certificates.findOne);


    // Retrieve all certificate for user 
    router.get("/users/:userId/certificates/", Certificates.findAllForUser);

    // // Update a users certificate with new id
    // router.put("/users/:userId/certificates/:certificateId", [authenticateRoute], Certificates.update);

    // // Delete an Certificates with certificate id
    // router.delete("/users/:userId/certificates/:certificateId", [authenticateRoute], Certificates.delete);

    // // Search for a certificate for a specific user
    // router.get("/users/:userId/certificates/:certificateId", Certificates.findOneForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 