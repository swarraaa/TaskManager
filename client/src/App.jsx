import './App.css'
import Form from './Components/Form/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
