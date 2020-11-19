const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const PoolMapSchema = new Schema({
  testBarcode: {
    type: Number,
    required: true,
  },
  poolBarcode: {
    type: Number,
    required: true,
  },
});

module.exports = PoolMap = mongoose.model("PoolMap", PoolMapSchema, "PoolMap");
