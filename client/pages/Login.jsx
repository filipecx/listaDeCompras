import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import {Lista} from './Lista'
import { Col, Container, Row } from 'react-bootstrap'
const cookies = new Cookies(null, { path: '/' });

export function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [data, setData] = useState(null)

    const mandaLogin = async (e, usuario, senha) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', usuario)
        formData.append('password', senha)

        try{
            Axios.post('https://lista-de-compras-chi.vercel.app/login', formData, {
                credentials: "same-origin",
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                if(response.data == 'No User Exists'){
                    console.log('no')
                }
                else{
                    console.log(response)
                    setData(response.data);
                    cookies.set('faustao', 'olokobicho')
                }
            })
        }catch(error){
            console.log(error)
        }
    }

    const mandaRegistro = async (e, usuario, senha) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', usuario)
        formData.append('password', senha)

        try{
            Axios.post('https://lista-de-compras-chi.vercel.app/register', formData, {
                credentials: "same-origin",
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Request-Method': 'POST'
                }
            })
            .then((response) => {
                if(response.data == 'Usuário já existe'){
                    console.log('no')
                }
                else{
                    console.log(response)
                }
            })
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <Form className='mx-3'>
                <Form.Group >
                    <Form.Control type='text' placeholder='Insira seu usário' className='my-2' onChange={(e) => setUsuario(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Insira sua senha' className='my-2' onChange={(e) => setSenha(e.target.value)} />
                </Form.Group>
                <Container>
                    <Row >
                        <Col className='d-flex justify-content-between align-items-baseline'>
                            <Button variant='primary'   onClick={(e) => mandaLogin(e, usuario, senha)}>
                                Login
                            </Button>
                            <Button variant='primary'  onClick={(e) => mandaRegistro(e, usuario, senha)}>
                                Registrar
                            </Button>
                    </Col>
                    </Row>
                    
                </Container>
            </Form>
            {data ? <Navigate to='https://lista-de-compras-t86p.vercel.app/lista'/>:null}

            
        </div>
        
    )
}
   