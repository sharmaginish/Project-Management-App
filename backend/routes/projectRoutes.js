// backend/routes/projectRoutes.js

const express = require("express");

const Project = require(
  "../models/Project"
);

const User = require(
  "../models/User"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// GET USERS
router.get(
  "/users",
  protect,

  async (req, res) => {

    try {

      const users =
        await User.find().select(
          "-password"
        );

      res.json(users);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// GET PROJECT
router.get(
  "/:id",
  protect,

  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        )
          .populate(
            "admin",
            "name email"
          )
          .populate(
            "members",
            "name email"
          );

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


// UPDATE MEMBERS
router.put(
  "/:id/members",
  protect,

  async (req, res) => {

    try {

      const { members } =
        req.body;

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          message:
            "Project not found",
        });
      }

      // ONLY ADMIN
      if (
        project.admin.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "Only admin can edit members",
        });
      }

      project.members =
        members;

      await project.save();

      const updatedProject =
        await Project.findById(
          project._id
        )
          .populate(
            "admin",
            "name email"
          )
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

module.exports = router;