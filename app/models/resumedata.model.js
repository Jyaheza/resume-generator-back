module.exports = (sequelize, Sequelize) => {
  const ResumeData = sequelize.define("ResumeData", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_phone_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    website_url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    summary: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });
  return ResumeData;
};
