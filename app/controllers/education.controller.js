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
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%`, }, } : null;

  Education.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Some error occurred while retrieving Education.",
      });
    });
};

exports.findOne = (req, res) => { 
  const educationId = req.params.id;

  Education.findAll({ where: { id: educationId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "An error occurred while retrieving Education.",
      });
    });
 };

exports.create = (req, res) => { 
  const education = {
    education_name: req.body.education_name,
    location: req.body.location,
    start_year: req.body.start_year,
    end_year: req.body.end_year,
    degree_name: req.body.degree_name,
    gpa: req.body.gpa,
    awards: req.body.awards,
    coursework: req.body.coursework,
    user_id: req.body.user_id,
  };

  Education.create(education)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message ||
          "Some error occurred while creating the education.",
      });
    });
};
exports.update = (req, res) => {   
  const id = req.params.id;

  Education.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Education was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Education with id = ${id}. Maybe Education was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error updating Education with id =" + id,
      });
    });
 };

exports.delete = (req, res) => {   
  const id = req.params.id;

  Education.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Education was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Education with id=${id}. Maybe Education was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Could not delete Education with id=" + id,
      });
    });
};