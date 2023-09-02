import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export function Item({titulo, posicao, deletarItem, id, toggleMarcado, marcado}){
    return(
        <Container className="d-flex justify-content-between">
            {marcado == 'true' ? <h4 className="text-decoration-line-through" 
            onClick={
                () => toggleMarcado(posicao)}>{titulo}</h4>: <h4 onClick={() => toggleMarcado(posicao)
                }>{titulo}</h4>}         
            <button className='trash' onClick={() => deletarItem(posicao, id)}><FontAwesomeIcon icon={faTrash}/></button>
        </Container>     
    )
}