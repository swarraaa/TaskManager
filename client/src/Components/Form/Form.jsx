import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Form.module.css'

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
})

const Form = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [taskName, setTaskName] = useState('')
  const [formAlert, setFormAlert] = useState('')
  const [formAlertClass, setFormAlertClass] = useState('')

  // Load tasks from /api/tasks
  const showTasks = async () => {
    setLoading(true)
    try {
      const response = await api.get('/tasks')
      const tasksData = response.data.tasks

      if (tasksData.length < 1) {
        setTasks([])
      } else {
        setTasks(tasksData)
      }
    } catch (error) {
      setFormAlert(`${error}`)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    showTasks()
  }, [])

  // Delete a task
  const deleteTask = async (id) => {
    setLoading(true)
    try {
      await api.delete(`/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/tasks', { name: taskName })
      showTasks()
      setTaskName('')
      setFormAlert('Success, task added')
      setFormAlertClass('text-success')
    } catch (error) {
      setFormAlert('Error, please try again')
    }
    setTimeout(() => {
      setFormAlert('')
      setFormAlertClass('')
    }, 3000)
  }

  return (
    <>
      <div>
        <form className='task-form' onSubmit={handleSubmit}>
          <h4>task manager</h4>
          <div className='form-control'>
            <input
              type='text'
              name='name'
              className='task-input'
              placeholder='e.g. wash dishes'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button type='submit' className='btn submit-btn'>
              submit
            </button>
          </div>
          <div
            className='form-alert'
            style={{ display: formAlert ? 'block' : 'none' }}
          >
            <p className={formAlertClass}>{formAlert}</p>
          </div>
        </form>
        <section className='tasks-container'>
          <p
            className='loading-text'
            style={{ visibility: loading ? 'visible' : 'hidden' }}
          >
            Loading...
          </p>
          <div className='tasks'>
            {tasks.length === 0 ? (
              <h5 className='empty-list'>No tasks in your list</h5>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className={`single-task ${
                    task.completed && 'task-completed'
                  }`}
                >
                  <h5>
                    <span>
                      <i className='far fa-check-circle'></i>
                    </span>
                    {task.name}
                  </h5>
                  <div className='task-links'>
                    <a href={`task.html?id=${task._id}`} className='edit-link'>
                      <i className='fas fa-edit'></i>
                    </a>
                    <button
                      type='button'
                      className='delete-btn'
                      data-id={task._id}
                      onClick={() => deleteTask(task._id)}
                    >
                      delete
                    </button>
                    <button
                      type='button'
                      className='delete-btn'
                      data-id={task._id}
                      onClick={() => deleteTask(task._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Form
