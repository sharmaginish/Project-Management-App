const mongoose = require("mongoose");

const projectSchema =
  new mongoose.Schema(

    {

      title: {

        type: String,

        required: true,

        trim: true,

      },

      description: {

        type: String,

        default: "",

        trim: true,

      },

      progress: {

        type: Number,

        default: 0,

        min: 0,

        max: 100,

      },

      status: {

        type: String,

        enum: [
          "Active",
          "Completed",
          "Pending"
        ],

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