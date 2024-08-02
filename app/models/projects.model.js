module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define("Projects", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    summary: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    start_year: {
      type: Sequelize.STRING,
      allowNull: false
    },
    end_year: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  return Projects;
};
