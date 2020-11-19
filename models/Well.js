const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const WellSchema = new Schema({
  wellBarcode: {
    type: Number,
    required: true,
  },
});

module.exports = Well = mongoose.model("Well", WellSchema, "Well");
