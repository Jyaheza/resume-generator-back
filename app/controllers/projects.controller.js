const db = require('../models');
const Projects = db.Projects;

exports.findAllForUser = async (req, res) => {
    let projects;
    try {
        projects = await Projects.findAll({
            where: { user_id: req.params.userId }
          });
      } catch (error) {
        console.error("Error fetching resume data: ", error);
        throw error;
      }

      return res.send(projects);
};

    /** Stubs. Add implementation later */
exports.findAll = (req, res) => { 
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%`, }, } : null;

  Projects.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Some error occurred while retrieving projects.",
      });
    });


};

exports.findOne = (req, res) => { 
  const projectId = req.params.id;
  //const userId = req.params.userId;

  Projects.findAll({ where: {projectId: projectId} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "An error occurred while retrieving project.",
      });
    });


};

exports.create = (req, res) => { 
  // if (req.body.name === undefined) {
  //   const error = new Error("Name for character can't be empty!");
  //   error.statusCode = 400;
  //   throw error;
  // }

  const project = {
    project_title: req.body.project_title,
    location: req.body.location,
    summary: req.body.summary,
    start_year: req.body.start_year,
    end_year: req.body.end_year,
    user_id: req.params.userId
  };

  Projects.create(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message ||
          "Some error occurred while creating the project.",
      });
    });


};
exports.update = (req, res) => { 
  const id = req.params.id;

  Projects.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Project was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update project with id = ${id}. Maybe project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error updating project with id =" + id,
      });
    });

};
exports.delete = (req, res) => {
  const id = req.params.id;

  Projects.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Project was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete project with id=${id}. Maybe project was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Could not delete project with id=" + id,
      });
    });

};