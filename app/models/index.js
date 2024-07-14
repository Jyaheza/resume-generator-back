const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/// Import and initialize models
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Resumes = require("./resume.model.js")(sequelize, Sequelize);
db.ResumeData = require("./resumedata.model.js")(sequelize, Sequelize);
db.ResumeReview = require("./review.model.js")(sequelize, Sequelize);
db.Skills = require("./skills.model.js")(sequelize, Sequelize);
db.Projects = require("./projects.model.js")(sequelize, Sequelize);
db.Experiences = require("./experiences.model.js")(sequelize, Sequelize);
db.Education = require("./education.model.js")(sequelize, Sequelize);
db.Certificates = require("./certificates.model.js")(sequelize, Sequelize);
db.Session = require("./session.model.js")(sequelize, Sequelize);

// Define relationships

// User has many Resumes
db.User.hasMany(db.Resumes, {
  as: "resumes",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});
db.Resumes.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});

// Resume has many ResumeReviews
db.Resumes.hasMany(db.ResumeReview, {
  as: "resumeReviews",
  foreignKey: { allowNull: false, name: 'resume_id' },
  onDelete: "CASCADE",
});
db.ResumeReview.belongsTo(db.Resumes, {
  as: "resume",
  foreignKey: { allowNull: false, name: 'resume_id' },
  onDelete: "CASCADE",
});

// User has many ResumeReviews (as reviewer)
db.User.hasMany(db.ResumeReview, {
  as: "reviewerReviews",
  foreignKey: { allowNull: false, name: 'reviewer_id' },
  onDelete: "CASCADE",
});
db.ResumeReview.belongsTo(db.User, {
  as: "reviewer",
  foreignKey: { allowNull: false, name: 'reviewer_id' },
  onDelete: "CASCADE",
});

//Resume data belongs to a user
db.ResumeData.belongsTo(db.User, {
  as:"user",
  foreignKey: {allowNull: false, name: 'user_id'},
  onDelete: 'CASCADE'
});

// User has many Skills
db.User.hasMany(db.Skills, {
  as: "skills",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});
db.Skills.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});

// User has many Projects
db.User.hasMany(db.Projects, {
  as: "projects",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});
db.Projects.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});

// User has many Experiences
db.User.hasMany(db.Experiences, {
  as: "experiences",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});
db.Experiences.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});

// User has many Educations
db.User.hasMany(db.Education, {
  as: "educations",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});
db.Education.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});

// User has many Certificates
db.User.hasMany(db.Certificates, {
  as: "certificates",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});
db.Certificates.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false, name: 'user_id' },
  onDelete: "CASCADE",
});

module.exports = db;