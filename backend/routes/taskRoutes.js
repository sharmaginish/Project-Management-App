// backend/routes/taskRoutes.js

const express = require("express");

const Task = require("../models/Task");
const Project = require("../models/Project");

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();



/* =========================================
   GET ALL TASKS OF PROJECT
========================================= */
router.get(
  "/project/:projectId",
  protect,

  async (req, res) => {
    try {

      const tasks =
        await Task.find({
          project: req.params.projectId,
        })
          .populate(
            "assignedTo",
            "name email"
          )
          .sort({ createdAt: -1 });

      res.json(tasks);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);



/* =========================================
   CREATE TASK
   ONLY ADMIN
========================================= */
router.post(
  "/",
  protect,

  async (req, res) => {
    try {

      const {
        title,
        description,
        assignedTo,
        priority,
        projectId,
      } = req.body;

      const project =
        await Project.findById(projectId);

      if (!project) {

        return res.status(404).json({
          message: "Project not found",
        });
      }

      // ONLY ADMIN
      if (
        project.admin.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "Only admin can create tasks",
        });
      }

      const task =
        await Task.create({
          title,
          description,
          assignedTo,
          priority,
          project: projectId,
          createdBy: req.user.id,
        });

      const populatedTask =
        await Task.findById(task._id)
          .populate(
            "assignedTo",
            "name email"
          );

      res.json(populatedTask);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);



/* =========================================
   UPDATE TASK STATUS
========================================= */
router.put(
  "/:id",
  protect,

  async (req, res) => {
    try {

      const task =
        await Task.findById(req.params.id);

      if (!task) {

        return res.status(404).json({
          message: "Task not found",
        });
      }

      task.status = req.body.status;

      await task.save();

      res.json(task);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);



/* =========================================
   DELETE TASK
   ONLY ADMIN
========================================= */
router.delete(
  "/:id",
  protect,

  async (req, res) => {
    try {

      const task =
        await Task.findById(req.params.id)
          .populate("project");

      if (!task) {

        return res.status(404).json({
          message: "Task not found",
        });
      }

      // ONLY ADMIN
      if (
        task.project.admin.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "Only admin can delete tasks",
        });
      }

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Task deleted",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = router;