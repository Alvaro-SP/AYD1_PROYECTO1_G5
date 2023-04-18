
import Categorias from "./components/Usuario/empresas/Categorias";
import Empresas from "./components/Usuario/empresas/Empresas";
import Productos from "./components/Usuario/productos/Productos";
import FinalizarPedido from "./components/Usuario/confirmarpedido/FinalizarPedido";
import HistorialPedidos from "./components/Usuario/historialpedidos/HistorialPedidos";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
function App() {
  const [idrestaurante, setIdRestaurante] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const orders = [
    {
      id: 1,
      items: [
        { id: 1, name: "Producto 1" },
        { id: 2, name: "Producto 2" },
        { id: 3, name: "Producto 3" },
      ],
      total: 150,
    },
    {
      id: 2,
      items: [
        { id: 4, name: "Producto 4" },
        { id: 5, name: "Producto 5" },
      ],
      total: 75,
    },
    {
      id: 3,
      items: [
        { id: 6, name: "Producto 6" },
        { id: 7, name: "Producto 7" },
        { id: 8, name: "Producto 8" },
        { id: 9, name: "Producto 9" },
      ],
      total: 220,
    },
  ];
  

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
          <Route path="/historialpedidos" element={<HistorialPedidos orders={orders} />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App