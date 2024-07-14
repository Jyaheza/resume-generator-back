const db = require('../models');
const Experiences = db.Experiences;

exports.findAllForUser = async (req, res) => {
    let experiences;
    try {
      experiences = await Experiences.findAll({
            where: { user_id: req.params.userId }
          });
      } catch (error) {
        console.error("Error fetching experience data: ", error);
        throw error;
      }

      return res.send(experiences);
};

    /** Stubs. Add implementation later */
exports.findAll = (req, res) => { /* stub */ };
exports.findOne = (req, res) => { /* stub */ };
exports.create = (req, res) => { /* stub */ };
exports.update = (req, res) => { /* stub */ };
exports.delete = (req, res) => { /* stub */ };