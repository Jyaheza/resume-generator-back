module.exports = (sequelize, Sequelize) => {
  const Experiences = sequelize.define("Experiences", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    job_title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    summary: {
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
    }
  });
  return Experiences;
};
