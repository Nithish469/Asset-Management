const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("assetdb", "postgres", "2006", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;