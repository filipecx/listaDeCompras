import { Route, Routes } from 'react-router-dom'
import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Login } from '../pages/Login'
import { Lista } from '../pages/Lista'
import { ProtectedRout } from '../components/ProtectedRout'

function App() {
  return (
    <div>
      <Container>
        <Row className='align-items-center'>
          <Col></Col>
          <Col sm={6}>
            <Routes>
            <Route path='/' exact element={<Login />}/>
            <Route element={<ProtectedRout />}>
                <Route path='/lista' element={<Lista />} />
            </Route>
            </Routes>
          </Col>
          <Col></Col>
      </Row>
      </Container>
    </div>
  )
}

export default App
