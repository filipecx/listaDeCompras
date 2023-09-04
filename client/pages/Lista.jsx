import { useEffect, useState } from "react"
import { Button, Form, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { Item } from "../components/Item"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import Cookies from 'universal-cookie'
const cookies = new Cookies(null, { path: '/' });

export function Lista(){
    const navigate = useNavigate()
    const [titulo, setTitulo] = useState('')
    const [itens, setItens] = useState([
       {/*  {_id: 1, titulo: 'Arroz', autor: 'eu2', completo: 'false'},
        {_id: 2, titulo: 'Feijão', autor: 'eu2', completo: 'false'},
        {_id: 3, titulo: 'Atum', autor: 'eu2', completo: 'false'},
        {_id: 4, titulo: 'Macarrão', autor: 'eu2', completo: 'false'}
        */}
    ])
    const toggleMarcado = (posicao) => {
        const novos = itens.slice()
        novos.map((item, index) => {
            if(index == posicao){
                item.completo == 'false' ? item.completo = 'true' : item.completo = 'false'
            }else{
                return null
            }
        })
        setItens(novos)
    }
    const pegaLista = async () => {
        try{
            
            await Axios.get('https://lista-de-compras-chi.vercel.app/lista', {
                credentials: "same-origin",
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Request-Headers': 'Content-Type'
                }
            })
                .then((response) => {
                    setItens(response.data)
                    console.log(response.data)
                })
            
            
        }catch(error){
            console.log(error)
        }
        
    }

    const adicionarItem = async () => {
        const novoItem = {
            titulo: titulo,
        }
        const novosItens = itens.slice()
        novosItens.splice(novosItens.length, 0, novoItem)
        setItens(novosItens)
        setTitulo('')
        try{
            await Axios.post('https://lista-de-compras-chi.vercel.app/lista/adicionarItem', {
                titulo: titulo,
            })
            .then((response) => console.log(response))
        }catch(error){
            console.log(error)
        }
        
    }

    const deletarItem = async (posicao, id) => {
        const novosItens = itens.slice()
        novosItens.splice(posicao, 1)
        setItens(novosItens)

        try{
            await Axios.delete(`https://lista-de-compras-chi.vercel.app/lista/deletarItem/${id}`)
            .then((res) => console.log(res))
        }catch(error){
            console.log(error)
        }
    }
    const logOut = async () => {
        
        try{
            await Axios.post('https://lista-de-compras-chi.vercel.app/logout')
            .then((res) => {
                navigate('/')
                cookies.remove('faustao')
                console.log(res)     
            })
        }catch(error){
            console.log(error)
        }
    }
    const finalizarLista = async () => {
        try{
            await Axios.delete(`https://lista-de-compras-chi.vercel.app/lista/finalizarLista/${itens[0].autor}`)
            .then((res) => console.log(res))
            setItens([])
        }catch(error){
            console.log(error)
        }
    }
   
    useEffect(() => {
        pegaLista()
    }, [])

    return(
        <>
        <div className="d-flex justify-content-end">
            <button onClick={logOut} className="logout mt-3">
                <FontAwesomeIcon icon={faRightFromBracket}/>
            </button>
        </div>
        <Form className="mt-3">
            <Form.Group>
                <Form.Control type="text" placeholder="Digite um item" onChange={(e) => setTitulo(e.target.value)} value={titulo}></Form.Control>
            </Form.Group>
            <Button onClick={adicionarItem} className="w-100 my-2" variant="primary">
                Adicionar
            </Button>
        </Form>
        <Card className="mt-2">
        {
            itens.map((item, index) => {
                return(               
                        <Item key={Math.floor(Math.random() * 1000)} 
                        titulo={item.titulo} 
                        posicao={index} 
                        deletarItem={deletarItem} 
                        id={item._id}
                        toggleMarcado={toggleMarcado}
                        marcado={item.completo}
                        
                        />             
                )
            })
         }
         </Card>
         <Button onClick={finalizarLista} className="w-100 my-2" variant="danger">
                Finalizar lista
            </Button>
        </>
    )
}