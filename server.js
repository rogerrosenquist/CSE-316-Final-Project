const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// bring in routes
const items = require("./routes/api/items");
const employees = require("./routes/api/employees");

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// database config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB Connected...`))
  .catch((err) => console.log(err));

// use routes
app.use("/api/items", items);
app.use("/api/employees", employees);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
