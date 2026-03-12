const Admin = require("../models/adminUser");
const jwt = require("jsonwebtoken");

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email } });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "Admin Registered Successfully",
      admin: newAdmin,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Login Admin
const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      "secretkey",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { registerAdmin, loginAdmin };