const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

const protect = require("../middleware/authMiddleware");



router.get(
  "/",
  protect,

  async(req,res)=>{

    try{

      const projects =
        await Project.find().sort({
          createdAt:-1
        });

      res.json(projects);

    }catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);



router.post(
  "/",
  protect,

  async(req,res)=>{

    try{

      const project =
        await Project.create({

          title:req.body.title,

          description:req.body.description,

          progress:0,

          status:"Active"

        });

      res.json(project);

    }catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);



router.put(
  "/:id",
  protect,

  async(req,res)=>{

    try{

      const project =
        await Project.findById(
          req.params.id
        );

      if(!project){

        return res.status(404).json({
          message:"Project not found"
        });

      }

      project.progress =
        req.body.progress;

      if(project.progress >= 100){

        project.status =
          "Completed";

      }

      await project.save();

      res.json(project);

    }catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);



router.delete(
  "/:id",
  protect,

  async(req,res)=>{

    try{

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:"Project deleted"
      });

    }catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);

module.exports = router;