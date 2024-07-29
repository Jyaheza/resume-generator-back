module.exports = (app) => {
    const Review = require("../controllers/review.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Reviews for a Resume
    router.post("/reviews/:userId", [authenticateRoute],Review.create);

    //Update a Resume with ID
    router.put("/review/:id", [authenticateRoute], Review.update);
  
    //Delete a Reviews for resume
    router.delete("/review/:id", [authenticateRoute], Review.delete);
  
    // Retrieve a single Reviews with id
    router.get("/review/", [authenticateRoute], Review.findAll);

    // Retrieve a single Reviews with id
    router.get("/review/:id",[authenticateRoute], Review.findOne);

        
    // Retrieve all review for user 
    router.get("/users/:userId/review/", [authenticateRoute], Review.findAllForUser);
    
    // Retrieve review all reviews on a resume 
    router.get("/reviews/:resumeId", [authenticateRoute], Review.getReviewsForResume);

    // // Update a users review with new id
    // router.put("/users/:userId/review/:reviewId", [authenticateRoute], Review.update);

    // // Delete an review with review id
    // router.delete("/users/:userId/review/:reviewId", [authenticateRoute], Review.delete);

    // // Search for a review for a specific user
    // router.get("/users/:userId/review/:reviewId", Review.findOneForUser);
  
    app.use("/resumebuilderapi", router);
  
  }; 