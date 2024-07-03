module.exports = (sequelize, Sequelize) => {
  const ResumeReview = sequelize.define("ResumeReview", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return ResumeReview;
};
