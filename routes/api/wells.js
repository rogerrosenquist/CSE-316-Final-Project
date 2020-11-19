const express = require("express");
const router = express.Router();

// well-map model
const Well = require("../../models/Well");

// @route GET api/wells
// @desc Get all Wells
// @access Public
router.get("/", (req, res) => {
  Well.find()
    .sort({ wellBarcode: 1 })
    .then((wells) => res.json(wells));
});

// @route POST api/wells
// @desc Create a Well
// @access Public
router.post("/", (req, res) => {
  const newWell = new Well({
    wellBarcode: req.body.wellBarcode,
  });

  newWell.save().then((well) => res.json(well));
});

// @route DELETE api/wells
// @desc Delete a Well
// @access Public
router.delete("/:id", (req, res) => {
  Well.findById(req.params.id)
    .then((well) =>
      well.remove().then(() => res.json({ message: "successfully deleted" }))
    )
    .catch((err) => res.status(404).json({ message: "unsuccessful delete" }));
});

module.exports = router;
