const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema({
  _commentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  dateAdded: {
    type: String,
    require: true,
    trim: false,
  },
  text: {
    type: String,
    required: true,
  },
  commentType: {
    type: String,
    enum: ["ADVISORY", "EVALUATIVE", "DISCRIPTIVE"],
    default: "DISCRIPTIVE",
  },
  _taskId: {
    type: ObjectId,
    ref: "Task"
  },
  _userId: {
    type: ObjectId,
    ref: "User"
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };
