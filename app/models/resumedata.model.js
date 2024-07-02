module.exports = (sequelize, Sequelize) => {
  const ResumeData = sequelize.define("ResumeData", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    summary: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    objective: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    resumeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Resumes',
        key: 'id'
      }
    }
  });
  return ResumeData;
};
