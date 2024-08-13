import React from 'react'
import { useParams } from 'react-router-dom'
import { buscarProductoPorId } from '../data/productos'
import { Navbar } from '../Components'
import { useGlobalContext } from '../Context/GlobalContext'

const Detail = () => {
    
    const {pid} = useParams()
    const producto = buscarProductoPorId(pid)
    const {agregarProductoAlCarrito} = useGlobalContext()

    return (
        <div>
            <Navbar/>
            <h1>{producto.nombre}</h1>
            <img src={producto.imagen} alt="" />
            <button onClick={() => agregarProductoAlCarrito(producto)}>Comprar</button>
        </div>
    )
}

export default Detail