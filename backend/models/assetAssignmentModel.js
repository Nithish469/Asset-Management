const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const AssetAssignment = sequelize.define("AssetAssignment", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  assetId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: "asset_assignments",
  timestamps: false
});

module.exports = AssetAssignment;