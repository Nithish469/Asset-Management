const Employee = require("../models/employeeModel");
const Asset = require("../models/assetModel");
const AssetAssignment = require("../models/assetAssignmentModel");

const getDashboardCounts = async (req, res) => {
  try {

    const totalEmployees = await Employee.count();
    const totalAssets = await Asset.count();
    const assignedAssets = await AssetAssignment.count();
    const availableAssets = totalAssets - assignedAssets;

    res.json({
      totalEmployees,
      totalAssets,
      assignedAssets,
      availableAssets
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardCounts };