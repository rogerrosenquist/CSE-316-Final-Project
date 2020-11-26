const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const WellTestingSchema = new Schema({
  wellBarcode: {
    type: Number,
    required: true,
  },
  poolBarcode: {
    type: Number,
    // required: true,
  },
  testingStartTime: {
    type: Date,
    default: Date.now,
  },
  testingEndTime: {
    type: Date,
    default: Date.now,
  },
  result: {
    type: String,
    default: "in progress",
  },
});

module.exports = WellTesting = mongoose.model(
  "WellTesting",
  WellTestingSchema,
  "WellTesting"
);
