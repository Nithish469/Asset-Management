const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
  },
  designation: {
    type: DataTypes.STRING,
  },
}, {
  tableName: "employees",
  timestamps: false,
});

module.exports = Employee;