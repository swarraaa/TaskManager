import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Form.module.css'
import EditTask from '../EditTask/EditTask'
import pin from '../../assets/pin.png'
import del from '../../assets/del.png'
import editimg from '../../assets/edit.png'
// import styles from './Form.module.css'

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
  const [edit, setEdit] = useState(false)
  const [editTaskId, setEditTaskId] = useState(null)
  const today = new Date()
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formattedDate = today.toLocaleDateString('en-US', options)

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
  }, [edit])

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

  //Handle when edit button is clicked
  const handleEdit = (taskId) => {
    setEditTaskId(taskId)
    setEdit(true)
  }

  return (
    <>
      {!edit ? (
        <div className={styles.mainContainer}>
          <div className={styles.innerContainer}>
            {/* Add a task */}
            <div className={styles.leftContainer}>
              <form className='task-form' onSubmit={handleSubmit}>
                <h1>Add a new task:</h1>
                <div className={styles.input}>
                  <input
                    type='text'
                    name='name'
                    className='task-input'
                    placeholder='e.g. study web dev'
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <button type='submit' className='btn submit-btn'>
                    Add
                  </button>
                </div>
                <div
                  className='form-alert'
                  style={{ display: formAlert ? 'block' : 'none' }}
                >
                  <p className={formAlertClass}>{formAlert}</p>
                </div>
              </form>
              <img
                src='https://res.cloudinary.com/dduur8qoo/image/upload/v1698849299/Untitled_design_7_j3e3cm.png'
                alt='add task'
                className='image'
              />
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.dateContainer}>
                <h1>Today,</h1>
                <h3>{formattedDate}</h3>
              </div>
              {/* Display tasks */}
              <section className={styles.taskMain}>
                <div className={styles.tasks}>
                  {tasks.length === 0 ? (
                    <h4 className={styles.empty}>
                      No tasks in your list! <br /> Add some!!!
                    </h4>
                  ) : (
                    tasks.map((task) => (
                      <div key={task._id} className={styles.singleTask}>
                        <div className={styles.imgCont}>
                          <img src={pin} alt='pin' />
                          <h5>{task.name}</h5>
                        </div>
                        <div className={styles.btns}>
                          <img
                            src={del} // Replace with the URL of your delete button image
                            alt='delete'
                            className={styles.deleteBtn}
                            onClick={() => deleteTask(task._id)}
                          />
                          <img
                            src={editimg}
                            alt='edit'
                            className={styles.editBtn}
                            data-id={task._id}
                            onClick={() => handleEdit(task._id)} // Pass the task ID
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <EditTask
          taskId={editTaskId}
          edit={edit}
          toggleEdit={() => setEdit(false)}
        />
      )}
    </>
  )
}

export default Form
