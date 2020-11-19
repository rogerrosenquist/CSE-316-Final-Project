/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

const express = require("express");
const router = express.Router();

// item model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get all Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route DELETE api/items
// @desc Delete an Item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item.remove().then(() => res.json({ message: "successfully deleted" }))
    )
    .catch((err) => res.status(404).json({ message: "unsuccessful delete" }));
});

module.exports = router;
