module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("Projects", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    });
    return Project;
  };
  