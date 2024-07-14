const db = require('../models');
const ResumeData = db.ResumeData;

exports.findAllForUser = async (req, res) => {
    let resumeData;
    try {
        resumeData = await ResumeData.findAll({
            where: { user_id: req.params.userId }
          });
      } catch (error) {
        console.error("Error fetching resume data: ", error);
        throw error;
      }

      return res.send(resumeData);
};

    /** Stubs. Add implementation later */
exports.findAll = (req, res) => { /* stub */ };
exports.findOne = (req, res) => { /* stub */ };
exports.create = (req, res) => { /* stub */ };
exports.update = (req, res) => { /* stub */ };
exports.delete = (req, res) => { /* stub */ };