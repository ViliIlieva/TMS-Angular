const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");

// middleware that is specific to this router

router.get("/", commentController.getComments);

router.post("/:taskId", commentController.createComment);

module.exports = router;
