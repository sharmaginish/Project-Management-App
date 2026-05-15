import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    progress: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Active",
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

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

export default mongoose.model(
  "Project",
  projectSchema
);