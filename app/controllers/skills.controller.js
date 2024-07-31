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
exports.findAll = (req, res) => { 
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%`, }, } : null;

  Skills.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Some error occurred while retrieving Skills.",
      });
    });


};

exports.findOne = (req, res) => { 
  const skillId = req.params.id;
  //const userId = req.params.userId;

  Skills.findAll({ where: {skillId: skillId} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "An error occurred while retrieving Skills.",
      });
    });


};

exports.create = (req, res) => { 
  // if (req.body.name === undefined) {
  //   const error = new Error("Name for character can't be empty!");
  //   error.statusCode = 400;
  //   throw error;
  // }

  const skill = {
    name: req.body.name,
    user_id: req.params.userId
  };

  Skills.create(skill)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message ||
          "Some error occurred while creating the skill.",
      });
    });


};
exports.update = (req, res) => { 
  const id = req.params.id;

  Skills.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Skill was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update skill with id = ${id}. Maybe skill was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error updating skill with id =" + id,
      });
    });

};
exports.delete = (req, res) => {
  const id = req.params.id;

  Skills.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "skills was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete skills with id=${id}. Maybe skills was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Could not delete skills with id=" + id,
      });
    });

};