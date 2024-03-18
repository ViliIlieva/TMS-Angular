const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TaskSchema = new mongoose.Schema({
  _taskId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  },
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
  },
  comments: [{
    type: ObjectId,
        ref: "Comment"
  }],
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };
