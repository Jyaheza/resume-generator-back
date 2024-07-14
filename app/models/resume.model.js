module.exports = (sequelize, Sequelize) => {
  const Resumes = sequelize.define("Resume", {
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
      type: Sequelize.BLOB('long'),
      allowNull: true
    },
  });
  return Resumes;
};
