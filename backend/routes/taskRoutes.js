const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const protect = require("../middleware/authMiddleware");



router.post(
  "/",
  protect,

  async (req,res) => {

    try {

      const task = await Task.create({

        ...req.body,

        user:req.user.id

      });

      res.json(task);

    } catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);



router.get(
  "/",
  protect,

  async (req,res) => {

    try {

      const tasks = await Task.find()
      .populate("assignedTo")
      .populate("project");

      res.json(tasks);

    } catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);



router.put(
  "/:id",
  protect,

  async (req,res) => {

    try {

      const task = await Task.findById(
        req.params.id
      );

      if(!task){

        return res.status(404).json({
          message:"Task not found"
        });

      }

      task.status =
        req.body.status || task.status;

      await task.save();

      res.json(task);

    } catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);



router.delete(
  "/:id",
  protect,

  async (req,res) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:"Task deleted"
      });

    } catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);

module.exports = router;