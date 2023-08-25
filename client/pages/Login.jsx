import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Axios from 'axios'
export function Login() {
    const [clicou, setClicou] = useState()
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const mandaLogin = async (usuario, senha) => {
        const formData = new FormData()
        formData.append('usuario', usuario)
        formData.append('senha', senha)

        try{
            Axios.post('http://localhost:3000/', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((response) => {
                console.log(response)
            })
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            {clicou ? <Navigate to='/lista' /> :
            <Form>
                <Form.Group>
                    <Form.Label>Usuário: </Form.Label>
                    <Form.Control type='text' placeholder='Insira seu usário' onChange={(e) => setUsuario(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Senha: </Form.Label>
                    <Form.Control type='text' placeholder='Insira sua senha' onChange={(e) => setSenha(e.target.value)} />
                </Form.Group>
                <Button variant='primary' onClick={() => mandaLogin(usuario, senha)}>
                    Login
                </Button>
            </Form>
            }
            
        </div>
        
    )
}
   