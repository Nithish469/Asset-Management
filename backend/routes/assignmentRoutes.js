const express = require("express");
const router = express.Router();

const {
  assignAsset,
  viewAssignments,
  returnAsset
} = require("../controllers/assignmentController");

router.post("/assignments", assignAsset);
router.get("/assignments", viewAssignments);
router.delete("/assignments/:id", returnAsset);

module.exports = router;