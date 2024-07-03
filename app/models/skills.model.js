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
    }
  });
  return Skill;
};
