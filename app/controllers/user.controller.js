const db = require("../models");
const User = db.User;
const Session = db.Session;
const Op = db.Sequelize.Op;
const { encrypt, getSalt, hashPassword } = require("../authentication/crypto");

// Create and Save a new User
exports.create = async (req, res) => {
  console.log(Session);
  // Validate request
  if (!req.body.firstName) {
    return res.status(400).send({ message: "First name cannot be empty for user!" });
  }
  if (!req.body.lastName) {
    return res.status(400).send({ message: "Last name cannot be empty for user!" });
  }
  if (!req.body.email) {
    return res.status(400).send({ message: "Email cannot be empty for user!" });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: "Password cannot be empty for user!" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      return res.status(400).send({ message: "This email is already in use." });
    }

    // Email not found, create the user
    console.log("email not found");

    let salt = await getSalt();
    let hash = await hashPassword(req.body.password, salt);

    // Create a User object
    const user = {
      id: req.body.id,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      salt: salt,
      role: req.body.role
    };

    // Save User in the database
    const createdUser = await User.create(user);

    // Create a Session for the new user
    let userId = createdUser.id;

    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);

    const session = {
      email: req.body.email,
      userId: userId,
      expirationDate: expireTime,
    };

    const createdSession = await Session.create(session);
    let sessionId = createdSession.id;
    let token = await encrypt(sessionId);

    let userInfo = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      role: user.role,
      token: token,
    };

    res.send(userInfo);
  } catch (err) {
    console.log(err.message);
    res.status(404).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error retrieving User with id = " + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Error updating User with id =" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Could not delete User with id = " + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
