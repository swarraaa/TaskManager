const Task = require('../models/task')
const { createCustomError } = require('../errors/custom-error')
const asyncWrapper = require('../middleware/aysnc')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const getOneTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findById({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const addTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).send({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  getOneTasks,
  addTask,
  deleteTask,
  updateTask,
}
