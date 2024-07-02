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
db.Resume = require("./resume.model.js")(sequelize, Sequelize);
db.ResumeData = require("./resumedata.model.js")(sequelize, Sequelize);
db.Review = require("./review.model.js")(sequelize, Sequelize);
db.Skill = require("./skills.model.js")(sequelize, Sequelize);
db.Project = require("./projects.model.js")(sequelize, Sequelize);
db.Experience = require("./experiences.model.js")(sequelize, Sequelize);
db.Education = require("./education.model.js")(sequelize, Sequelize);

// Define relationships

// User has many Resumes
db.User.hasMany(db.Resume, {
  as: "resumes",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.Resume.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Resume has one ResumeData
db.Resume.hasOne(db.ResumeData, {
  as: "resumeData",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ResumeData.belongsTo(db.Resume, {
  as: "resume",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Resume has many Reviews
db.Resume.hasMany(db.Review, {
  as: "reviews",
  foreignKey: {
    name: 'resumeId', 
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Review.belongsTo(db.Resume, {
  as: "resume",
  foreignKey: {
    name: 'resumeId', 
    allowNull: false,
  },
  onDelete: "CASCADE",
});

// User has many Skills
db.User.hasMany(db.Skill, {
  as: "skills",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.Skill.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// User has many Projects
db.User.hasMany(db.Project, {
  as: "projects",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.Project.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// User has many Experiences
db.User.hasMany(db.Experience, {
  as: "experiences",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.Experience.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// User has many Educations
db.User.hasMany(db.Education, {
  as: "educations",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.Education.belongsTo(db.User, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;
