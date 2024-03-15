const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema({
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
    type: String
  },
  _userId: {
    type: String
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };
