const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");

// middleware that is specific to this router
router.get("/:commentId", commentController.getComment);

router.get("/", commentController.getComments);

router.delete("/:commentId", commentController.deleteComment);

router.post(`/`, commentController.createComment);

router.put("/", commentController.editCommentText)

module.exports = router;
