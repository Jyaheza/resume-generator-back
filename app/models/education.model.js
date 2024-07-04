module.exports = (sequelize, Sequelize) => {
  const Education = sequelize.define("Education", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    education_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    start_year: {
      type: Sequelize.DATE,
      allowNull: false
    },
    end_year: {
      type: Sequelize.DATE,
      allowNull: true
    },
    degree_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    awards: {
      type: Sequelize.STRING,
      allowNull: true
    },
    coursework: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  return Education;
};
