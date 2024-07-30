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
exports.update = async (req, res) => {
  const id = req.params.id;
  const resumeData = req.body;
  let affectedRows;
  try {
    const [affectedRows] = await ResumeData.update(
      resumeData,
      { where: { id: id } }
    );
    try {
      if (affectedRows > 0) {
        return res.status(200).send({
          message: 'Resume Data has been successfully updated.'
        });
      } else {
        return res.status(500).send({
          message: 'No resumeData found with id' + resumeId,
        });
      }
    } catch (error) {
      console.error(`An error occurred while returning resumeData update status: ${error.message}`);
      return res.status(500).send({
        message: "An error occurred while returning resumeData update status",
      });
    }

  } catch (error) {
    console.error("Error updating resumeData: ", error);
    throw error;
  }
};
exports.delete = (req, res) => { /* stub */ };