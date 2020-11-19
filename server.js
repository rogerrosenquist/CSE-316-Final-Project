const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// disables pluralizing collection names
mongoose.pluralize(null);

const app = express();

// bodyparser middleware
app.use(bodyParser.json());
