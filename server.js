const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// bring in routes
const items = require("./routes/api/items"); // TESTING PURPOSES
const employees = require("./routes/api/employees");
const employeeTests = require("./routes/api/employee-tests");
const poolMaps = require("./routes/api/pool-maps");
const pools = require("./routes/api/pools");
const wellTestings = require("./routes/api/well-testings");
const wells = require("./routes/api/wells");

const app = express();

// cors middleware
// app.use(cors({ origin: CLIENT_LOCAL_ORIGIN, credentials: true }));
const corsPolicy = async (req, res, next) => {
  console.log(req.headers.origin);
  res.set("Access-Control-Allow-Origin", req.headers.origin);
  next();
};
app.options("*", cors());
app.use(corsPolicy);

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
app.use("/api/items", items); // TESTING PURPOSES
app.use("/api/employees", employees);
app.use("/api/employee-tests", employeeTests);
app.use("/api/pool-maps", poolMaps);
app.use("/api/pools", pools);
app.use("/api/well-testings", wellTestings);
app.use("/api/wells", wells);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
