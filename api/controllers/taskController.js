// const express = require("express");
const { Task } = require("../models/taskModel");

function getTasks(req, res, next) {
  Task.find()
    .populate("_commentId")
    .then((tasks) => res.json(tasks))
    .catch(next);
}

function getTask(req, res, next) {
  const {taskId: taskId} = req.params;

  Task.findById(taskId)
    .populate("_userId _commentId")
    .then((task) => res.json(task))
    .catch(next);
}


function createTask(req, res, next) {
  const { taskName, taskText, taskType, _userId } = req.body;
  const status = 'toDo';
  
  return Task.create({taskName, taskText, status, taskType, _userId })
  .then((task) => {
    res.status(200).send(task);})
  .catch(next);
}

function editTaskStatus(req, res, next){
  const { taskId, status} = req.body;

  Task.findOneAndUpdate(
    { _id: taskId },
    {status }
  )
  .then((task) => {
    res.status(200).json(task);
  })
  .catch(next);
}

// function deleteTask(req, res, next) {
//   const {taskId: _id} = req.params;
//      Task.findOneAndDelete({_id})
//      .then((removedTask) => {
//         res.status(200).send(removedTask);})
//     .catch(next);
// }

function deleteTask(req, res, next) {
  const {taskId: _id} = req.params;
  
     Task.findOneAndDelete({_id})
     .then((removedTask) => {
        res.status(200).send(removedTask);})
    .catch(next);
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  editTaskStatus,
  deleteTask
};
