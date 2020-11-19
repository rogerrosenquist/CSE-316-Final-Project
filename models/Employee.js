const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const EmployeeSchema = new Schema({
  employeeID: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  isLabWorker: {
    type: Boolean,
    default: false,
  },
});

module.exports = Employee = mongoose.model(
  "Employee",
  EmployeeSchema,
  "Employee"
);
