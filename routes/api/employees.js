const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();

// employee model
const Employee = require("../../models/Employee");

// @route GET api/employees
// @desc Get all Employees
// @access Public
router.get("/", (req, res) => {
  Employee.find()
    .sort({ employeeID: -1 })
    .then((employees) => res.json(employees));
});

// @route POST api/employees
// @desc Create an Employee
// @access Public
router.post("/", (req, res) => {
  const newEmployee = new Employee({
    employeeID: req.body.employeeID,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    passcode: req.body.passcode,
  });

  newEmployee.save().then((employee) => res.json(employee));
});

// @route DELETE api/employees
// @desc Delete an Employee
// @access Public
router.delete("/:id", (req, res) => {
  Employee.findById(req.params.id)
    .then((employee) =>
      employee
        .remove()
        .then(() => res.json({ message: "successfully deleted" }))
    )
    .catch((err) => res.status(404).json({ message: "unsuccessful delete" }));
});

// @route PUT api/employees
// @desc Update an Employee
// @access Public
router.put("/:id", (req, res) => {
  const updatedEmployee = req.body;

  Employee.findByIdAndUpdate(
    updatedEmployee._id,
    updatedEmployee,
    (err, updatedValue) => {
      if (err) {
        res.json({
          updatedEmployee,
          success: false,
          msg: "Failed to update Employee",
        });
      } else {
        res.json({ updatedEmployee, success: true, msg: "Employee updated" });
      }
    }
  );
});

module.exports = router;
