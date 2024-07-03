module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define("Resume", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    resume_text: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    resume_pdf: {
      type: Sequelize.STRING,
      allowNull: true
    },
  });
  return Resume;
};
