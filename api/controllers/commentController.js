const { User } = require("../models/user.model");
const { Task } = require("../models/taskModel");
const { Comment } = require("../models/comment.model");

function newComment(
  dateAdded,
  text,
  commentType,
  _taskId,
  _userId,
  reminderDate,
) {
  return Comment.create({
    dateAdded,
    text,
    commentType,
    taskId: _taskId,
    userId: _userId,
    reminderDate,
  }).then((comment) => {
    return Promise.all([
      User.updateOne(
        { _id: _userId },
        { $push: { comments: comment._id }, $addToSet: { tasks: _taskId } },
      ),
      Task.findByIdAndUpdate(
        { _id: _taskId },
        {
          $push: { comments: comment._id },
          $addToSet: { assignedTo: _userId },
        },
        { new: true },
      ),
    ]);
  });
}

function getComments(req, res, next) {
  // const limit = Number(req.query.limit) || 0;

  Comment.find()
    // .limit(limit)
    // .populate("_taskId _userId")
    .then((comments) => res.json(comments))
    .catch(next);
}


function createComment(req, res, next) {
  const { taskId: _taskId } = req.params;
  const { text, commentType, _userId } = req.body;

  
  //   .then(([_, updatedTask]) => res.status(200).json(updatedTask))
  //   .catch(next);

    return Comment.create({
      text, commentType, _userId, _taskId
    }).then((comment) => {
      return Promise.all([
        User.updateOne(
          { _id: _userId },
          { $push: { comments: comment._id }, $addToSet: { tasks: _taskId } },
        ),
        Task.findByIdAndUpdate(
          { _id: _taskId },
          {
            $push: { comments: comment._id },
            $addToSet: { assignedTo: _userId },
          },
          { new: true },
        ),
      ]);
    });
}

// function editComment(req, res, next) {
//   const { commentId: _commentId } = req.params;
//   const { dateAdded, text, commentType, reminderDate } = req.body;
//   const { _id: _userId } = req.user;

//   // if the userId is not the same as this one of the comment, the comment will not be updated
//   Comment.findOneAndUpdate(
//     { _id: _commentId, userId: _userId },
//     {
//       dateAdded: dateAdded,
//       text: text,
//       commentType: commentType,
//       reminderDate: reminderDate,
//     },
//     { new: true },
//   )
//     .then((updatedComment) => {
//       if (updatedComment) {
//         res.status(200).json(updatedComment);
//       } else {
//         res.status(401).json({ message: `Not allowed!` });
//       }
//     })
//     .catch(next);
// }

// function deleteComment(req, res, next) {
//   const { _commentId, _taskId } = req.params;
//   const { _id: userId } = req.user;

//   Promise.all([
//     Comment.findOneAndDelete({ _id: _commentId, _userId }),
//     User.findOneAndUpdate(
//       { _id: _userId },
//       { $pull: { comments: _commentId } },
//     ),
//     Task.findOneAndUpdate(
//       { _id: _taskId },
//       { $pull: { comments: _commentId } },
//     ),
//   ])
//     .then(([deletedOne, _, __]) => {
//       if (deletedOne) {
//         res.status(200).json(deletedOne);
//       } else {
//         res.status(401).json({ message: `Not allowed!` });
//       }
//     })
//     .catch(next);
// }

module.exports = {
  newComment,
  getComments,
  createComment,
};
