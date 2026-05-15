const express = require("express");

const router = express.Router();

const Project = require(
  "../models/Project"
);

const User = require(
  "../models/User"
);

const protect = require(
  "../middleware/authMiddleware"
);


/* =========================================
   GET USERS
========================================= */
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

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);


/* =========================================
   GET ALL PROJECTS
========================================= */
router.get(
  "/",
  protect,

  async (req, res) => {

    try {

      const projects =
        await Project.find()
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

      res.json(projects);

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
   GET SINGLE PROJECT
========================================= */
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

      if (!project) {

        return res.status(404).json({
          message:
            "Project not found",
        });
      }

      res.json(project);

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
   CREATE PROJECT
========================================= */
router.post(
  "/",
  protect,

  async (req, res) => {

    try {

      const project =
        await Project.create({
          title:
            req.body.title,

          description:
            req.body.description,

          admin:
            req.user.id,

          members: [],
        });

      const populatedProject =
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

      res.status(201).json(
        populatedProject
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
   UPDATE PROJECT MEMBERS
========================================= */
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

      res.json(
        updatedProject
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

module.exports = router;