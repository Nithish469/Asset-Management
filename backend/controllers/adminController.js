const Employee = require("../models/employeeModel");

// Add Employee
const addEmployee = async (req, res) => {
  try {
    const { name, email, department, designation } = req.body;

    const newEmployee = await Employee.create({
      name,
      email,
      department,
      designation,
    });

    res.status(201).json({
      message: "Employee Added Successfully",
      employee: newEmployee,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// View All Employees
const viewEmployees = async (req, res) => {
 try {

  const employees = await Employee.findAll({
   order: [["id", "ASC"]]
  });

  res.json(employees);

 } catch (error) {
  res.status(500).json({ message: "Server error" });
 }
};


// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await Employee.destroy({
      where: { id }
    });

    res.status(200).json({ message: "Employee Deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Update Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, department, designation } = req.body;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update({
      name,
      email,
      department,
      designation
    });

    res.json({ message: "Employee updated successfully", employee });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  addEmployee,
  viewEmployees,
  deleteEmployee,
  updateEmployee
};