const express = require("express");
const router = express.Router();

// pool-map model
const PoolMap = require("../../models/PoolMap");

// @route GET api/pool-maps
// @desc Get all PoolMaps
// @access Public
router.get("/", (req, res) => {
  PoolMap.find()
    .sort({ poolBarcode: 1 })
    .then((poolMaps) => res.json(poolMaps));
});

// @route POST api/pool-maps
// @desc Create a PoolMap
// @access Public
router.post("/", (req, res) => {
  const newPoolMap = new PoolMap({
    testBarcode: req.body.testBarcode,
    poolBarcode: req.body.poolBarcode,
  });

  newPoolMap.save().then((poolMap) => res.json(poolMap));
});

// @route DELETE api/pool-maps
// @desc Delete a PoolMap
// @access Public
router.delete("/:id", (req, res) => {
  PoolMap.findById(req.params.id)
    .then((poolMap) =>
      poolMap.remove().then(() => res.json({ message: "successfully deleted" }))
    )
    .catch((err) => res.status(404).json({ message: "unsuccessful delete" }));
});

// @route PUT api/pool-maps
// @desc Update a PoolMap
// @access Public
router.put("/:id", (req, res) => {
  const updatedPoolMap = req.body;

  PoolMap.findByIdAndUpdate(
    updatedPoolMap._id,
    updatedPoolMap,
    (err, updatedValue) => {
      if (err) {
        res.json({
          updatedPoolMap,
          success: false,
          msg: "Failed to update PoolMap",
        });
      } else {
        res.json({
          updatedPoolMap,
          success: true,
          msg: "PoolMap updated",
        });
      }
    }
  );
});

module.exports = router;
