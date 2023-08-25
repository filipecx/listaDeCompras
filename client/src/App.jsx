import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
//import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Login } from '../pages/Login'
import { Lista } from '../pages/Lista'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Login />}/>
        <Route path='/lista' element={<Lista />}/>
      </Routes>
    </div>
  )
}

export default App
