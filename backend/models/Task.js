// backend/models/Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
      ],
      default: "Pending",
    },

    // PROJECT
    project: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // TASK ADMIN
    admin: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // TASK MEMBERS
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

module.exports = mongoose.model(
  "Task",
  taskSchema
);