import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditTask = () => {
  const [taskId, setTaskId] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskCompleted, setTaskCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formAlert, setFormAlert] = useState('')
  const [formAlertClass, setFormAlertClass] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    setTaskId(id)
    showTask(id)
  }, [])

  const showTask = async (id) => {
    try {
      const response = await axios.get(`/api/v1/tasks/${id}`)
      const taskData = response.data.task
      const { _id: taskID, completed, name } = taskData

      setTaskId(taskID)
      setTaskName(name)
      setTaskCompleted(completed)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.patch(`/api/v1/tasks/${taskId}`, {
        name: taskName,
        completed: taskCompleted,
      })
      const taskData = response.data.task
      const { _id: taskID, completed, name } = taskData

      setTaskId(taskID)
      setTaskName(name)
      setTaskCompleted(completed)
      setFormAlert('Success, edited task')
      setFormAlertClass('text-success')
    } catch (error) {
      console.error(error)
      setFormAlert('Error, please try again')
    } finally {
      setLoading(false)
    }
    setTimeout(() => {
      setFormAlert('')
      setFormAlertClass('')
    }, 3000)
  }

  return (
    <div className='container'>
      <form className='single-task-form' onSubmit={handleSubmit}>
        <h4>Edit Task</h4>
        <div className='form-control'>
          <label>Task ID</label>
          <p className='task-edit-id'>{taskId}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='task-edit-name'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='completed'>Completed</label>
          <input
            type='checkbox'
            name='completed'
            className='task-edit-completed'
            checked={taskCompleted}
            onChange={(e) => setTaskCompleted(e.target.checked)}
          />
        </div>
        <button type='submit' className='block btn task-edit-btn'>
          {loading ? 'Loading...' : 'Edit'}
        </button>
        <div
          className='form-alert'
          style={{ display: formAlert ? 'block' : 'none' }}
        >
          <p className={formAlertClass}>{formAlert}</p>
        </div>
      </form>
      <a href='index.html' className='btn back-link'>
        Back to tasks
      </a>
    </div>
  )
}

export default EditTask
