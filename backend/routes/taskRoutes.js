// backend/routes/taskRoutes.js

const express = require("express");

const Task = require("../models/Task");

const Project = require(
  "../models/Project"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();



/* =========================================
   GET PROJECT TASKS
========================================= */
router.get(
  "/project/:projectId",
  protect,

  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          project:
            req.params.projectId,
        }).sort({
          createdAt: -1,
        });

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
        priority,
        projectId,
      } = req.body;

      // FIND PROJECT
      const project =
        await Project.findById(
          projectId
        );

      if (!project) {

        return res.status(404).json({
          message:
            "Project not found",
        });
      }

      // ONLY ADMIN
      if (
        !project.admin ||
        project.admin.toString() !==
          req.user.id
      ) {

        return res.status(403).json({
          message:
            "Only admin can create tasks",
        });
      }

      // CREATE TASK
      const task =
        await Task.create({
          title,
          description,
          priority,
          project: projectId,
          createdBy: req.user.id,
        });

      res.status(201).json(task);

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
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res.status(404).json({
          message:
            "Task not found",
        });
      }

      task.status =
        req.body.status;

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
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res.status(404).json({
          message:
            "Task not found",
        });
      }

      const project =
        await Project.findById(
          task.project
        );

      // ONLY ADMIN
      if (
        !project.admin ||
        project.admin.toString() !==
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
        message:
          "Task deleted successfully",
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