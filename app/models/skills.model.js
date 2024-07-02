module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define("Skills", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Description: {
      type: Sequelize.STRING,
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
  return Skill;
};
