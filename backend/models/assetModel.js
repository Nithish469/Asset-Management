const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Asset = sequelize.define("Asset", {
  asset_id: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  asset_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asset_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  po_number: {
    type: DataTypes.STRING,
    unique: true
  },
  purchase_date: {
    type: DataTypes.DATE
  },
  asset_value:{
    type:DataTypes.FLOAT
  },
  warranty_start:{
    type:DataTypes.DATE
  },
  warranty_end:{
    type:DataTypes.DATE
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "available"
  }
});

module.exports = Asset;