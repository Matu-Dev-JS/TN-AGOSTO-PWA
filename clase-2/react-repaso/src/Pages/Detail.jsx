import React from 'react'
import { useParams } from 'react-router-dom'
import { buscarProductoPorId } from '../data/productos'
import { Navbar } from '../Components'

const Detail = () => {
    
    const {pid} = useParams()
    const producto = buscarProductoPorId(pid)

    return (
        <div>
            <Navbar/>
            <h1>{producto.nombre}</h1>
            <img src={producto.imagen} alt="" />
            <button>Comprar</button>
        </div>
    )
}

export default Detail