module.exports = (app) => {
    const Projects = require("../controllers/projects.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Projects for a Resume
    router.post("/projects/", [authenticateRoute], Projects.create);
  
    //Update a Projects with ID
    router.put("/projects/:id", [authenticateRoute], Projects.update);
  
    //Delete a Projects for resume
    router.delete("/projects/:id", [authenticateRoute], Projects.delete);
  
    // Retrieve a all Projects with id
    router.get("/projects/", Projects.findAll);

    // Retrieve a single Projects with id
    router.get("/projects/:id", Projects.findOne);


    // Retrieve all projects for user 
    router.get("/users/:userId/projects/", Projects.findAllForUser);

    // // Update a users projects with new id
    // router.put("/users/:userId/projects/:projectsId", [authenticateRoute], Projects.update);

    // // Delete an projects with projects id
    // router.delete("/users/:userId/projects/:projectsId", [authenticateRoute], Projects.delete);

    // // Search for a projects for a specific user
    // router.get("/users/:userId/projects/:projectsId", Projects.findOneForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 