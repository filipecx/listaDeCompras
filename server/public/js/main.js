const deleteBtn = document.querySelectorAll('.delete')



const deleteItem = async () => {
    let a = this.parentElement
    let b = a.getAttribute('id')
    console.log(b)
    /*
    const itemId = this.parent.dataset.id  
    try{
        const response = await fetch('lista/deletarItem', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({'itemFromJSFile': itemId})
        })
        const data = await response.json()
        console.log(data)
        location.reload
    }catch(error){
        console.log(error)
    }
    */
}

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteItem)
})