const express = require("express");

const Task = require(
  "../models/Task"
);

const Project = require(
  "../models/Project"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


/* =========================================
   GET TASKS OF PROJECT
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
        })
          .populate(
            "admin",
            "name email"
          )
          .populate(
            "members",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(tasks);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);


/* =========================================
   CREATE TASK
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

      // ONLY PROJECT ADMIN
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
          priority,

          project: projectId,

          admin: req.user.id,

          members: [],
        });

      const populatedTask =
        await Task.findById(
          task._id
        )
          .populate(
            "admin",
            "name email"
          )
          .populate(
            "members",
            "name email"
          );

      res.status(201).json(
        populatedTask
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);


/* =========================================
   UPDATE TASK MEMBERS
   ONLY TASK ADMIN
========================================= */
router.put(
  "/:id/members",
  protect,

  async (req, res) => {

    try {

      const { members } =
        req.body;

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

      // STRICT ADMIN CHECK
      if (
        String(task.admin) !==
        String(req.user._id)
      ) {

        return res.status(403).json({
          message:
            "Only task admin can edit members",
        });
      }

      task.members =
        members;

      await task.save();

      const updatedTask =
        await Task.findById(
          task._id
        )
          .populate(
            "admin",
            "name email"
          )
          .populate(
            "members",
            "name email"
          );

      res.json(
        updatedTask
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);


/* =========================================
   DELETE TASK
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

      // STRICT ADMIN CHECK
      if (
        String(task.admin) !==
        String(req.user.id)
      ) {

        return res.status(403).json({
          message:
            "Only task admin can delete task",
        });
      }

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Task deleted",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);

module.exports = router;