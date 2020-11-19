const express = require("express");
const router = express.Router();

// employee-test model
const EmployeeTest = require("../../models/EmployeeTest");

// @route GET api/employee-tests
// @desc Get all EmployeeTests
// @access Public
router.get("/", (req, res) => {
  EmployeeTest.find()
    .sort({ testBarcode: 1 })
    .then((employeeTests) => res.json(employeeTests));
});

// @route POST api/employee-tests
// @desc Create an EmployeeTest
// @access Public
router.post("/", (req, res) => {
  const newEmployeeTest = new EmployeeTest({
    testBarcode: req.body.testBarcode,
    employeeID: req.body.employeeID,
    collectionTime: req.body.collectionTime,
    collectedBy: req.body.collectedBy,
  });

  newEmployeeTest.save().then((employeeTest) => res.json(employeeTest));
});

// @route DELETE api/employee-tests
// @desc Delete an EmployeeTest
// @access Public
router.delete("/:id", (req, res) => {
  EmployeeTest.findById(req.params.id)
    .then((employeeTest) =>
      employeeTest
        .remove()
        .then(() => res.json({ message: "successfully deleted" }))
    )
    .catch((err) => res.status(404).json({ message: "unsuccessful delete" }));
});

module.exports = router;
