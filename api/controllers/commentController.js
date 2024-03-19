const { Comment } = require("../models/comment.model");

function getComments(req, res, next) {

  Comment.find()
    .then((comments) => res.json(comments))
    .catch(next);
}

function deleteComment(req, res, next) {
  const {commentId: _id} = req.params;
     Comment.findOneAndDelete({_id})
     .then((removedComment) => {
        res.status(200).send(removedComment);})
    .catch(next);
}


function createComment(req, res, next) {
  // const { taskId: _taskId } = req.params;
  const { _taskId, text, commentType, _userId } = req.body;
  console.log(_taskId,_userId, text, commentType );

    return Comment.create({text, commentType, _userId, _taskId})
    .then((comment) => {
      res.status(200).send(comment);})
      .catch(next);
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
  getComments,
  deleteComment,
  createComment,
};
