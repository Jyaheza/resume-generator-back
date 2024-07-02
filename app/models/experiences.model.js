module.exports = (sequelize, Sequelize) => {
    const Experiences = sequelize.define("Experience", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
      company: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
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
    return Experiences;
  };
  