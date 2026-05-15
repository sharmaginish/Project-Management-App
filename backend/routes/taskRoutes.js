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

const admin = require("../middleware/adminMiddleware");

router.post(
  "/",
  protect,
  admin,

  async (req,res) => {

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

    const task = await Task.findById(req.params.id);

    if(!task){

      return res.status(404).json({
        message:"Task not found"
      });

    }

    if(
      req.user.role !== "Admin" &&
      task.user.toString() !== req.user.id
    ){

      return res.status(403).json({
        message:"Access denied"
      });

    }

    task.status = req.body.status || task.status;

    await task.save();

    res.json(task);

  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }

});

module.exports = router;