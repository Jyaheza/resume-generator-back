module.exports = (sequelize, Sequelize) => {
  const Skills = sequelize.define("Skills", {
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
  return Skills;
};
