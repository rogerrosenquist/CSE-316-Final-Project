const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const PoolSchema = new Schema({
  poolBarcode: {
    type: Number,
    required: true,
  },
});

module.exports = Pool = mongoose.model("Pool", PoolSchema, "Pool");
