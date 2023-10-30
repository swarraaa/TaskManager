import { useState } from 'react'
import './App.css'
import EditTask from './Components/EditTask/EditTask'
import Form from './Components/Form/Form'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>hello</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Form />} />
          <Route path='/edit/:id' component={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
