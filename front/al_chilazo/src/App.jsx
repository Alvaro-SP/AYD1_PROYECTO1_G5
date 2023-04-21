import { useState } from "react";
import { Start } from "./components/Start/Start";
import { SidebarAdmin } from "./components/Administrador/Sidebar";
import { SidebarRepartidor } from "./components/Repartidor/Sidebar";

import Categorias from "./components/Usuario/empresas/Categorias";
import Empresas from "./components/Usuario/empresas/Empresas";
import Productos from "./components/Usuario/productos/Productos";
import FinalizarPedido from "./components/Usuario/confirmarpedido/FinalizarPedido";
import HistorialPedidos from "./components/Usuario/historialpedidos/HistorialPedidos";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
function App() {
  const [flagAdmin, setAdminFlag] = useState(false);
  const [flagRepartidor, setRepartidorFlag] = useState(true);
  const [flagEmpresa, setEmpresaFlag] = useState(false);
  const [flagUsuario, setUsuarioFlag] = useState(false);
  const [flagStart, setStartFlag] = useState(false);

  const logout = () => {
    setAdminFlag(false);
    setRepartidorFlag(false);
    setEmpresaFlag(false);
    setUsuarioFlag(false);
    setStartFlag(true);
  };

  if (flagStart) {
    return (
      <>
        <Start
          adFlag={setAdminFlag}
          repFlag={setRepartidorFlag}
          empFlag={setEmpresaFlag}
          userFlag={setUsuarioFlag}
          startFlag={setStartFlag}
        />
      </>
    );
  }

  if (flagAdmin) {
    return (
      <>
        <SidebarAdmin logout={logout} />
      </>
    )
    
  }

  if (flagRepartidor) {
    return (
      <>
        <SidebarRepartidor logout={logout} />
      </>
    );
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