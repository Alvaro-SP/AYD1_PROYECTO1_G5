import { useState } from "react"
import { Start } from "./components/start_components/Start";
import { SidebarAdmin } from "./components/admin_components/Sidebar"
import { SidebarEmpresa } from "./components/empresa/Sidebar"

function App() {
  const [flagAdmin, setAdminFlag] = useState(false)
  const [flagRepartidor, setRepartidorFlag] = useState(false)
  const [flagEmpresa, setEmpresaFlag] = useState(true)
  const [flagUsuario, setUsuarioFlag] = useState(false)
  const [flagStart, setStartFlag] = useState(false)


  if(flagStart) {
    return (
      <>
        <Start adFlag={setAdminFlag} repFlag={setRepartidorFlag} empFlag={setEmpresaFlag} userFlag={setUsuarioFlag} startFlag={setStartFlag} />
      </>
    );
  } 
  if (flagEmpresa) {
    return (
      <>
        <SidebarEmpresa />
      </>
    );
  }
  if (flagAdmin) {
    return (
      <>
        <SidebarAdmin />
      </>
    )
    
  }
}

export default App;
