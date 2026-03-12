const Asset = require("../models/assetModel");

// GET all assets
exports.getAssets = async (req, res) => {
  try {

    const assets = await Asset.findAll({
      order:[["id","DESC"]]
    });

    res.json(assets);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server Error" });

  }
};



// CREATE asset (AUTO GENERATE ASSET ID)
exports.createAsset = async (req, res) => {
  try {

    const lastAsset = await Asset.findOne({
      order: [["id", "DESC"]]
    });

    let newAssetId = "AST001";

    if (lastAsset && lastAsset.asset_id) {

      const lastNumber = parseInt(
        lastAsset.asset_id.replace("AST", "")
      );

      const nextNumber = lastNumber + 1;

      newAssetId = "AST" + String(nextNumber).padStart(3,"0");
    }

    const asset = await Asset.create({
      asset_id: newAssetId,
      asset_name: req.body.asset_name,
      asset_type: req.body.asset_type,
      po_number: req.body.po_number,
      purchase_date: req.body.purchase_date,
      asset_value: req.body.asset_value,
      warranty_start: req.body.warranty_start,
      warranty_end: req.body.warranty_end,
      status: req.body.status
    });

    res.json(asset);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server Error" });

  }
};



// UPDATE asset
exports.updateAsset = async (req, res) => {
  try {

    const { id } = req.params;

    await Asset.update(req.body,{
      where:{ id }
    });

    res.json({ message:"Asset Updated" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message:"Server Error" });

  }
};



// DELETE asset
exports.deleteAsset = async (req, res) => {
  try {

    const { id } = req.params;

    await Asset.destroy({
      where:{ id }
    });

    res.json({ message:"Asset Deleted" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message:"Server Error" });

  }
};