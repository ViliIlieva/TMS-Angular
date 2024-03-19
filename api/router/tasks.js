const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { taskController, commentController } = require("../controllers");

// middleware that is specific to this router

router.get("/", taskController.getTasks);

router.put("/", taskController.editTaskStatus);

router.post("/", taskController.createTask);

router.get("/:taskId", taskController.getTask);

router.post(`/:taskId`, commentController.createComment);

router.delete("/:taskId", taskController.deleteTask);

// router.post("/:taskId", auth(), commentController.createComment);

// router.put("/:taskId", auth(), taskController.subscribe);

// router.put(
//   "/:taskId/comments/:commentId",
//   auth(),
//   commentController.editComment,
// );


module.exports = router;
