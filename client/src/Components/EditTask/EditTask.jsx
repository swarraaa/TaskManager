import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './EditTask.module.css'

const api = axios.create({
  baseURL: 'https://taskmanager-backend-smi3.onrender.com',
})

const EditTask = ({ taskId, edit, toggleEdit }) => {
  const [taskName, setTaskName] = useState('')
  const [taskCompleted, setTaskCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formAlert, setFormAlert] = useState('')
  const [formAlertClass, setFormAlertClass] = useState('')

  useEffect(() => {
    showTask(taskId)
  }, [])

  const showTask = async () => {
    try {
      const response = await api.get(`/tasks/${taskId}`)
      const taskData = response.data.task
      const { _id: taskID, completed, name } = taskData
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
      const response = await api.patch(`/tasks/${taskId}`, {
        name: taskName,
        completed: taskCompleted,
      })
      const taskData = response.data.task
      const { _id: taskID, completed, name } = taskData

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
    <div className={styles.mainCont}>
      <div className={styles.innerCont}>
        <form className={styles.one} onSubmit={handleSubmit}>
          <h1>Edit Task</h1>
          <div className={styles.inputCont}>
            <span>Name:</span>
            <input
              type='text'
              name='name'
              className='task-edit-name'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className={styles.inputCont}>
            <span>Completed:</span>
            <input
              type='checkbox'
              name='completed'
              className='task-edit-completed'
              checked={taskCompleted}
              onChange={(e) => setTaskCompleted(e.target.checked)}
            />
          </div>
          <div
            className='form-alert'
            style={{ display: formAlert ? 'block' : 'none' }}
          >
            <p className={formAlertClass}>{formAlert}</p>
          </div>
          <button className={styles.editbtn} type='submit'>
            {loading ? 'Loading...' : 'Edit'}
          </button>
        </form>
        <button className={styles.home} onClick={() => toggleEdit()}>
          Back to tasks
        </button>
      </div>
    </div>
  )
}

export default EditTask
