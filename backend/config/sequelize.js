const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("assetdb", "postgres", "2007", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;