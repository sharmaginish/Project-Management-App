const express = require("express");

const Task = require("../models/Task");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {

  try {

    const task = await Task.create({
  ...req.body,
  user: req.user.id,
});

    res.json(task);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.get("/", protect, async (req, res) => {

  try {

    const tasks = await Task.find({ user: req.user.id })
    .populate("assignedTo")
    .populate("project");

    res.json(tasks);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.put("/:id", protect, async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(task);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;