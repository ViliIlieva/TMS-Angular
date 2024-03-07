// const express = require("express");
const { User } = require("../models/user.model");
const { Task } = require("../models/taskModel");

function getTasks(req, res, next) {
  // const { _id: _userId } = req.user;

  Task.find()
    .populate("_userId _commentId")
    .then((tasks) => res.json(tasks))
    .catch(next);
}

function getTask(req, res, next) {
  const { taskId: _taskId } = req.params;

  Task.findById(_taskId)
    .populate("_userId _commentId")
    .then((task) => res.json(task))
    .catch(next);
}

function createTask(req, res, next) {
  const { taskName, taskText, taskType } = req.body;
  const status = 'toDo';
  
  return Task.create({taskName, taskText, status, taskType })
  .then((task) => {
    res.status(200).send(task);})
  .catch(next);
  
}

function editTask(req, res, next) {
  const { taskId: _taskId } = req.params;
  const { taskName } = req.body.taskName;
  const { createdDate } = req.body.createdDate;
  const { requiredDate } = req.body.requiredDate;
  const { description } = req.body.description;
  const { status } = req.body.status;
  const { taskType } = req.body.taskType;
  const { nextActionDate } = req.body.nextActionDate;
  const { _id: _userId } = req.user;

  // if the userId is not the same as this one of the task, the task will not be updated
  Task.findOneAndUpdate(
    { _id: _taskId, userId: _userId },
    {
      taskName: taskName,
      createdDate: createdDate,
      requiredDate: requiredDate,
      description: description,
      status: status,
      taskType: taskType,
      nextActionDate: nextActionDate,
    },
    { new: true },
  )
    .then((updatedTask) => {
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function subscribe(req, res, next) {
  const _taskId = req.params.taskId;
  const { _id: _userId } = req.user;
  Task.findByIdAndUpdate(
    { _id: _taskId },
    { $addToSet: { assignedTo: _userId } },
    { new: true },
  )
    .then((updatedTask) => {
      res.status(200).json(updatedTask);
    })
    .catch(next);
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  editTask,
  subscribe,
};
