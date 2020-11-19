const express = require("express");
const router = express.Router();

// well-testing model
const WellTesting = require("../../models/WellTesting");

// @route GET api/well-testings
// @desc Get all WellTestings
// @access Public
router.get("/", (req, res) => {
  WellTesting.find()
    .sort({ wellBarcode: 1 })
    .then((wellTestings) => res.json(wellTestings));
});

// @route POST api/well-testings
// @desc Create a WellTesting
// @access Public
router.post("/", (req, res) => {
  const newWellTesting = new WellTesting({
    poolBarcode: req.body.pollBarcode,
    wellBarcode: req.body.wellBarcode,
    testingStartTime: req.body.testingStartTime,
    testingEndTime: req.body.testingEndTime,
    result: req.body.result,
  });

  newWellTesting.save().then((wellTesting) => res.json(wellTesting));
});

// @route DELETE api/well-testings
// @desc Delete a WellTesting
// @access Public
router.delete("/:id", (req, res) => {
  WellTesting.findById(req.params.id)
    .then((wellTesting) =>
      wellTesting
        .remove()
        .then(() => res.json({ message: "successfully deleted" }))
    )
    .catch((err) => res.status(404).json({ message: "unsuccessful delete" }));
});

module.exports = router;
