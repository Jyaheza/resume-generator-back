const db = require('../models');
const ResumeReview = db.ResumeReview;


exports.getReviewsForResume = async (req, res) => {
  const resumeId = req.params.resumeId;

  try {
    const reviews = await ResumeReview.findAll({
      where: { resume_id: resumeId },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).send(reviews);
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return res.status(500).send({ message: "Error fetching reviews" });
  }
};


exports.create = async (req, res) => {
    const userId = req.params.userId;
        const { comments, suggestions, reviewer_name,resumeId } = req.body;  
  
    if (!comments || !resumeId) {
      return res.status(400).send({ message: "Comments and resumeId are required" });
    }
  
    try {
      const newReview = await ResumeReview.create({
        title: `${reviewer_name}'s Review`,
        reviewer_name: reviewer_name,
        comments: comments,
        suggestions: suggestions,
        status: 'Pending',
        reviewer_id: userId,  
        resume_id: resumeId
      });
  
      return res.status(201).send(newReview);
    } catch (error) {
      console.error("Error adding review: ", error);
      return res.status(500).send({ message: "Error adding review" });
    }
  };
  

    /** Stubs. Add implementation later */
exports.findAll = (req, res) => { /* stub */ };
exports.findOne = (req, res) => { /* stub */ };
exports.update = (req, res) => { /* stub */ };
exports.delete = (req, res) => { /* stub */ };
exports.findAllForUser = (req, res) => { /* stub */ };