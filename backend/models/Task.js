const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },

  dueDate: {
    type: Date,
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  priority:{
  type:String,
  enum:["Low","Medium","High"],
  default:"Medium"
}

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },

  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

}, {
  timestamps: true,
});

const Task = mongoose.model(
  "Task",
  taskSchema
);

module.exports = Task;