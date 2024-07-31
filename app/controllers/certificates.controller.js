const db = require('../models');
const Certificates = db.Certificates;

exports.findAllForUser = async (req, res) => {
  let certificates;
  try {
    certificates = await Certificates.findAll({
      where: { user_id: req.params.userId }
    });
  } catch (error) {
    console.error("Error fetching resume data: ", error);
    throw error;
  }

  return res.send(certificates);
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%`, }, } : null;

  Certificates.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Some error occurred while retrieving Certificates.",
      });
    });


};

exports.findOne = (req, res) => {
  const certificateId = req.params.id;

  Certificates.findAll({ where: { id: certificateId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "An error occurred while retrieving Certificates.",
      });
    });


};

exports.create = (req, res) => {

  const certificate = {
    certificate_title: req.body.certificate_title,
    issuer: req.body.issuer,
    cert_url: req.body.cert_url,
    summary: req.body.summary,
    issue_date: req.body.issue_date,
    expire_date: req.body.expire_date,
    user_id: req.body.user_id
  };

  Certificates.create(certificate)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message ||
          "Some error occurred while creating the certificate.",
      });
    });


};
exports.update = (req, res) => {
  const id = req.params.id;

  Certificates.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Certificate was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update certificate with id = ${id}. Maybe certificate was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error updating certificate with id =" + id,
      });
    });

};
exports.delete = (req, res) => {
  const id = req.params.id;

  Certificates.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Certificates was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Certificates with id=${id}. Maybe Certificates was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Could not delete Certificates with id=" + id,
      });
    });

};