const mongoose = require("mongoose");

const projectSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      progress: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        default: "Active",
      },

      // PROJECT ADMIN
      admin: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // PROJECT MEMBERS
      members: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Project",
    projectSchema
  );