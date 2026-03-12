const verifyToken = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { 
  addEmployee,
  deleteEmployee,
  viewEmployees,
  updateEmployee,
} = require("../controllers/adminController");
const{ loginAdmin} =require("../controllers/authController");
//Login
router.post("/Login",loginAdmin);
// Routes
router.post("/employees", verifyToken,addEmployee);
router.get("/employees", verifyToken,viewEmployees);
router.delete("/employees/:id", verifyToken,deleteEmployee);
router.put("/employees/:id",verifyToken,updateEmployee);
module.exports = router;