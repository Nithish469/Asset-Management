const AssetAssignment = require("../models/assetAssignmentModel");
const Employee = require("../models/employeeModel");
const Asset = require("../models/assetModel");


// Assign asset to employee
const assignAsset = async (req, res) => {
  try {

    const { employeeId, assetId } = req.body;

    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      return res.status(404).json({
        message: "Asset not found"
      });
    }

    // Prevent duplicate assignment
    if (asset.status === "assigned") {
      return res.status(400).json({
        message: "Asset already assigned"
      });
    }

    const assignment = await AssetAssignment.create({
      employeeId,
      assetId
    });

    // Update asset status
    asset.status = "assigned";
    await asset.save();

    res.status(201).json({
      message: "Asset assigned successfully",
      assignment
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
// View all asset assignments
const viewAssignments = async (req, res) => {
  try {

    const assignments = await AssetAssignment.findAll();

    const result = [];

    for (let a of assignments) {

      const employee = await Employee.findByPk(a.employeeId);
      const asset = await Asset.findByPk(a.assetId);

      if (employee && asset) {
        result.push({
          id:a.id,
          employeeId: employee.id,
          name: employee.name,
          email: employee.email,
          department: employee.department,
          designation: employee.designation,

          assetId: asset.id,
          assetName: asset.asset_name,
          assetType: asset.asset_type,
          serialNumber: asset.serial_number,
          purchaseDate: asset.purchase_date
        });
      }

    }

    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const returnAsset = async (req, res) => {
  try {

    const { id } = req.params;

    const assignment = await AssetAssignment.findByPk(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    await assignment.destroy();

    const asset = await Asset.findByPk(assignment.assetId);

    if (asset) {
      asset.status = "available";
      await asset.save();
    }

    res.json({
      message: "Asset returned successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
module.exports = {
  assignAsset,
  viewAssignments,
  returnAsset
};