const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  getOneTasks,
  addTask,
  deleteTask,
  updateTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(addTask)
router.route('/:id').get(getOneTasks).delete(deleteTask).patch(updateTask)

module.exports = router
