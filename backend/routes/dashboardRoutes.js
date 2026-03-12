const express = require("express");
const router = express.Router();

const { getDashboardCounts } = require("../controllers/dashboardController");

router.get("/dashboard", getDashboardCounts);

module.exports = router;