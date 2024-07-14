const db = require('../models');
const Education = db.Education;

exports.findAllForUser = async (req, res) => {
    let education;
    try {
        education = await Education.findAll({
            where: { user_id: req.params.userId }
          });
      } catch (error) {
        console.error("Error fetching experience data: ", error);
        throw error;
      }

      return res.send(education);
};

    /** Stubs. Add implementation later */
exports.findAll = (req, res) => { /* stub */ };
exports.findOne = (req, res) => { /* stub */ };
exports.create = (req, res) => { /* stub */ };
exports.update = (req, res) => { /* stub */ };
exports.delete = (req, res) => { /* stub */ };