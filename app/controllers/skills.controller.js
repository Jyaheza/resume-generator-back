const db = require('../models');
const Skills = db.Skills;

exports.findAllForUser = async (req, res) => {
    let skills;
    try {
        skills = await Skills.findAll({
            where: { user_id: req.params.userId }
          });
      } catch (error) {
        console.error("Error fetching resume data: ", error);
        throw error;
      }

      return res.send(skills);
};

    /** Stubs. Add implementation later */
exports.findAll = (req, res) => { /* stub */ };
exports.findOne = (req, res) => { /* stub */ };
exports.create = (req, res) => { /* stub */ };
exports.update = (req, res) => { /* stub */ };
exports.delete = (req, res) => { /* stub */ };