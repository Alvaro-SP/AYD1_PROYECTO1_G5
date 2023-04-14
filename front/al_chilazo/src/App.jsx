
import Categorias from "./components/Usuario/empresas/Categorias";
import Empresas from "./components/Usuario/empresas/Empresas";
import Productos from "./components/Usuario/productos/Productos";
import FinalizarPedido from "./components/Usuario/confirmarpedido/FinalizarPedido";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
function App() {
  const [idrestaurante, setIdRestaurante] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);

  function establecerRestaurante(id) {
    setIdRestaurante(id);
    console.log(id);
  }

  function agregarConfirmacion(carro, total) {
    console.log(carro);
    setCarrito(carro);
    setTotalPedido(total);
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      
      <Router>
        <Routes>
          <Route path="/restaurantes" element={<Empresas functionapp={establecerRestaurante}/>}/>
          <Route path="/productos" element={<Productos empresa={idrestaurante} functionconfirmar={agregarConfirmacion}/>}/>
          <Route path="/finalizarpedido" element={<FinalizarPedido carrito={carrito} totalPedido={totalPedido} />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App
