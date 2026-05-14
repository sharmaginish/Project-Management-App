const express = require("express");

const Task = require("../models/Task");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {

  try {

    const task = await Task.create(req.body);

    res.json(task);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.get("/", auth, async (req, res) => {

  try {

    const tasks = await Task.find()
    .populate("assignedTo")
    .populate("project");

    res.json(tasks);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.put("/:id", auth, async (req, res) => {

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