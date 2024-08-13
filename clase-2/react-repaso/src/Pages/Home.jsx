import React from 'react'
import { Navbar, ProductsList } from '../Components'
import { productos } from '../data/productos'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <h1>Bienvienido</h1>
        <ProductsList products={productos}/>
    </div>
  )
}

export default Home