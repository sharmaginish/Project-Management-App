const express = require("express");

const Project = require("../models/Project");

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL USERS
router.get(
  "/users",
  protect,

  async (req, res) => {

    try {

      const users =
        await User.find().select("-password");

      res.json(users);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);



// GET ALL PROJECTS
router.get(
  "/",
  protect,

  async (req, res) => {

    try {

      const projects =
        await Project.find()
          .sort({ createdAt: -1 });

      res.json(projects);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);



// GET SINGLE PROJECT
router.get(
  "/:id",
  protect,

  async (req, res) => {

    try {

      const project =
        await Project.findById(req.params.id)
          .populate("members", "name email")
          .populate("admin", "name");

      if (!project) {

        return res.status(404).json({
          message: "Project not found",
        });

      }

      res.json(project);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);



// CREATE PROJECT
router.post(
  "/",
  protect,

  async (req, res) => {

    try {

      const project =
        await Project.create({

          title: req.body.title,

          description:
            req.body.description,

          progress: 0,

          status: "Active",

          admin: req.user.id,

          members: [],
        });

      res.json(project);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);



// UPDATE PROJECT MEMBERS
router.put(
  "/:id/members",
  protect,

  async (req, res) => {

    try {

      const { members } = req.body;

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          message: "Project not found",
        });

      }

      // ONLY ADMIN CAN UPDATE
      if (
        project.admin.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "Only admin can edit members",
        });

      }

      project.members = members;

      await project.save();

      const updatedProject =
        await Project.findById(project._id)
          .populate(
            "members",
            "name email"
          );

      res.json(updatedProject);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);



// UPDATE PROJECT PROGRESS
router.put(
  "/:id",
  protect,

  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          message: "Project not found",
        });

      }

      project.progress =
        req.body.progress;

      if (project.progress >= 100) {

        project.status =
          "Completed";

      }

      await project.save();

      res.json(project);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);



// DELETE PROJECT
router.delete(
  "/:id",
  protect,

  async (req, res) => {

    try {

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Project deleted",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);

module.exports = router;