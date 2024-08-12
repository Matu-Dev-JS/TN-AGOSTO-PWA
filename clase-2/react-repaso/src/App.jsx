import React from 'react'
import { Carrito, Error404, Home } from './Pages'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/*" element={<Error404/>} />
      </Routes>
  )
}

export default App
