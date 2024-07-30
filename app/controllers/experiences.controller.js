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
exports.findAll = (req, res) => { 
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%`, }, } : null;

  Experiences.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Some error occurred while retrieving Experiences.",
      });
    });


};

exports.findOne = (req, res) => { 
  const experienceId = req.params.id;
  //const userId = req.params.userId;

  Experiences.findAll({ where: {experienceId: experienceId} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "An error occurred while retrieving Experiences.",
      });
    });


};

exports.create = (req, res) => { 
  // if (req.body.name === undefined) {
  //   const error = new Error("Name for character can't be empty!");
  //   error.statusCode = 400;
  //   throw error;
  // }

  const experience = {
    employer: req.body.employer,
    job_title: req.body.job_title,
    city: req.body.city,
    state: req.body.state,
    summary: req.body.summary,
    start_year: req.body.start_year,
    end_year: req.body.end_year,
    user_id: req.params.userId
  };

  Experiences.create(experience)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message ||
          "Some error occurred while creating the experience.",
      });
    });


};
exports.update = (req, res) => { 
  const id = req.params.id;

  Experiences.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Experience was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update experience with id = ${id}. Maybe experience was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error updating experience with id =" + id,
      });
    });

};
exports.delete = (req, res) => {
  const id = req.params.id;

  Experiences.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "experiences was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete experiences with id=${id}. Maybe experiences was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Could not delete experiences with id=" + id,
      });
    });

};