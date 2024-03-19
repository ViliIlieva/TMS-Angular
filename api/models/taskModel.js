const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskText: {
    type: String,
    require: true,
    trim: false,
  },
  status: {
    type: String,
    enum: ["toDo", "inProgress", "codeReview", "done", "close"],
    default: "inProgress",
    require: true,
  },
  taskType: {
    type: String,
    enum: ["frontend", "backend", "serverTask"],
    default: "frontend",
    require: true,
  },
  _userId:{
    type: String
  }
}, 
{
  versionKey: false}
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };
