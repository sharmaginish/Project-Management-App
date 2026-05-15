const express = require("express");

const Task = require("../models/Task");
const Project = require("../models/Project");

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// CREATE TASK
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
          priority,
          project: projectId,
          createdBy: req.user.id,
        });

      res.json(task);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// GET TASKS
router.get(
  "/project/:projectId",
  protect,

  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          project: req.params.projectId,
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

module.exports = router;