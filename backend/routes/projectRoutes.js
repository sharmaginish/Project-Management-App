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

      // PROJECT NOT FOUND
      if (!project) {

        return res.status(404).json({
          message: "Project not found",
        });

      }

      // FIX OLD PROJECTS WITHOUT ADMIN
      if (!project.admin) {

        project.admin = req.user.id;

        await project.save();
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

      // UPDATE MEMBERS
      project.members = members;

      await project.save();

      // RETURN UPDATED PROJECT
      const updatedProject =
        await Project.findById(project._id)
          .populate(
            "members",
            "name email"
          )
          .populate(
            "admin",
            "name email"
          );

      res.json({
        message:
          "Members updated successfully",
        project: updatedProject,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });

    }

  }
);