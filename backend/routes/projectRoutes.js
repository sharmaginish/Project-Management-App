const express = require("express");

const Project = require("../models/Project");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {

  try {

    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json(project);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.get("/", auth, async (req, res) => {

  try {

    const projects = await Project.find()
    .populate("members")
    .populate("createdBy");

    res.json(projects);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;