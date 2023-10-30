import React, { useState } from 'react'
import EditTask from '../EditTask/EditTask'
import Form from '../Form/Form'

const Main = () => {
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState('')

  const toggleEdit = (taskId) => {
    setEdit(true)
    setId(taskId)
  }

  return (
    <>{edit ? <EditTask edit id={id} /> : <Form toggleEdit={toggleEdit} />}</>
  )
}

export default Main
