const { Comment } = require("../models/comment.model");

function getComment(req, res, next) {
  const {commentId: _id} = req.params;

  Comment.findById(_id)
    .then((comment) => res.json(comment))
    .catch(next);
}

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
  const { commentType, text, _taskId, _userId } = req.body;

    return Comment.create({commentType, text, _taskId, _userId})
    .then((comment) => {
      res.status(200).send(comment);})
      .catch(next);
}

function editCommentText(req, res, next) {
  const { _id, text} = req.body;
  console.log(_id, text);

  Comment.findOneAndUpdate(
    { _id: _id },
    {text}
  )
  .then((comment) => {
    res.status(200).json(comment);
  })
  .catch(next);
}

module.exports = {
  getComment,
  getComments,
  deleteComment,
  createComment,
  editCommentText
};
