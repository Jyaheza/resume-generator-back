module.exports = (sequelize, Sequelize) => {
    const Certificate = sequelize.define("Certificate", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      certificate_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      issuer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cert_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      summary: {
        type: Sequelize.STRING,
        allowNull: true
      },
      issue_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expire_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
    return Certificate;
  };
  