import React from 'react'
import { Navbar } from '../Components'
import { useGlobalContext } from '../Context/GlobalContext'

const Carrito = () => {
    const {carrito} = useGlobalContext()
    
  return (
    <div>
        <Navbar />
        <h1>Carrito</h1>
        {
          carrito.map(item => {
            return (
              <div>
                <h2>{item.nombre}</h2>
                <span>Precio: ${item.precio}</span>
                <p>Cantidad comprada: {item.cantidad}</p>
              </div>
            )
          })
        }
    </div>
  )
}

export default Carrito