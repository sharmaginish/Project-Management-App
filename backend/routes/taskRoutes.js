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
   GET ALL TASKS
========================================= */

router.get(
  "/",
  protect,

  async (req, res) => {

    try {

      const tasks =
        await Task.find()
          .populate(
            "admin",
            "name email"
          )
          .populate(
            "members",
            "name email"
          )
          .populate(
            "project",
            "title"
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

      // IF PROJECT TASK

      if (projectId) {

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
          String(project.admin) !==
          String(req.user._id)
        ) {

          return res.status(403).json({
            message:
              "Only admin can create tasks",
          });

        }

      }

      const task =
        await Task.create({

          title,

          description,

          priority:
            priority || "Medium",

          status: "Pending",

          project:
            projectId || null,

          admin:
            req.user._id,

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
   UPDATE TASK
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

      // ONLY ADMIN

      if (
        String(task.admin) !==
        String(req.user._id)
      ) {

        return res.status(403).json({
          message:
            "Only task admin can update task",
        });

      }

      task.title =
        req.body.title ||
        task.title;

      task.description =
        req.body.description ||
        task.description;

      task.priority =
        req.body.priority ||
        task.priority;

      task.status =
        req.body.status ||
        task.status;

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
   UPDATE TASK MEMBERS
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

      // ONLY TASK ADMIN

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

      // ONLY TASK ADMIN

      if (
        String(task.admin) !==
        String(req.user._id)
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