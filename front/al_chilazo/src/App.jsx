import { useState } from "react"
import { Start } from "./components/start_components/Start";
import { SidebarAdmin } from "./components/admin_components/Sidebar"

function App() {
  const [flagAdmin, setAdminFlag] = useState(false)
  const [flagRepartidor, setRepartidorFlag] = useState(false)
  const [flagEmpresa, setEmpresaFlag] = useState(false)
  const [flagUsuario, setUsuarioFlag] = useState(false)
  const [flagStart, setStartFlag] = useState(true)


  if(flagStart) {
    return (
      <>
        <Start adFlag={setAdminFlag} repFlag={setRepartidorFlag} empFlag={setEmpresaFlag} userFlag={setUsuarioFlag} startFlag={setStartFlag} />
      </>
    );
  } 
  
  if (flagAdmin) {
    return (
      <>
        <SidebarAdmin />
      </>
    );
  }
}

export default App;
