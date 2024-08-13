import React from 'react'
import { Navbar, ProductsList } from '../Components'
import { productos } from '../data/productos'
import { useGlobalContext } from '../Context/GlobalContext'
const Home = () => {
    const valores = useGlobalContext()
    console.log(valores)
  return (
    <div>
        <Navbar/>
        <h1>Bienvienido</h1>
        <ProductsList products={productos}/>
    </div>
  )
}

export default Home