const express = require("express");
const router = express.Router();

// pool-map model
const Pool = require("../../models/Pool");

// @route GET api/pools
// @desc Get all Pools
// @access Public
router.get("/", (req, res) => {
  Pool.find()
    .sort({ poolBarcode: 1 })
    .then((pools) => res.json(pools));
});

// @route POST api/pools
// @desc Create a Pool
// @access Public
router.post("/", (req, res) => {
  const newPool = new Pool({
    poolBarcode: req.body.poolBarcode,
  });

  newPool.save().then((pool) => res.json(pool));
});

// @route DELETE api/pools
// @desc Delete a Pool
// @access Public
router.delete("/:id", (req, res) => {
  Pool.findById(req.params.id)
    .then((pool) =>
      pool.remove().then(() => res.json({ message: "successfully deleted" }))
    )
    .catch((err) => res.status(404).json({ message: "unsuccessful delete" }));
});

module.exports = router;
