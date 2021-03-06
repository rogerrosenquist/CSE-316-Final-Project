const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const EmployeeTestSchema = new Schema({
  testBarcode: {
    type: Number,
    required: true,
  },
  employeeID: {
    type: Number,
    required: true,
  },
  collectionTime: {
    type: Date,
    default: Date.now,
  },
  collectedBy: {
    type: String,
  },
  result: {
    type: String,
    default: "in progress",
  },
});

module.exports = EmployeeTest = mongoose.model(
  "EmployeeTest",
  EmployeeTestSchema,
  "EmployeeTest"
);
