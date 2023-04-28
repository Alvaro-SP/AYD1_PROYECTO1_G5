
import { useEffect, useState } from "react";
import { Start } from "./components/Start/Start";
import { SidebarAdmin } from "./components/Administrador/Sidebar";
import { SidebarRepartidor } from "./components/Repartidor/Sidebar";
import { SidebarEmpresa } from "./components/empresa/Sidebar";
import { SidebarUsuario } from "./components/Usuario/Sidebar";
import { url } from "./shared/url";
import axios from "axios";


function App() {
  const [flagAdmin, setAdminFlag] = useState(false);
  const [flagRepartidor, setRepartidorFlag] = useState(false);
  const [flagEmpresa, setEmpresaFlag] = useState(false);
  const [flagUsuario, setUsuarioFlag] = useState(false);
  const [flagStart, setStartFlag] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("rol")!==null || localStorage.getItem("rol")!==undefined)
    localStorage.setItem('rol',"")
  }, []);
  const logout = async () => {
    setAdminFlag(false);
    setRepartidorFlag(false);
    setEmpresaFlag(false);
    setUsuarioFlag(false);
    setStartFlag(true);
    localStorage.setItem("rol", "")

    try {
      const result = (await axios.post(url + "logout")).data
      if(result.res) {
        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4"
        })
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4"
        })
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text red darken-4 rounded"
      })
    }
  };

  if (flagStart && localStorage.getItem("rol") === "") {
    if(!flagStart) {
      setStartFlag(true)
    }
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

  if (flagAdmin || localStorage.getItem("rol") === "0") {
    if(!flagAdmin) {
      setAdminFlag(true)
    }
    return (
      <>
        <SidebarAdmin logout={logout} />
      </>
    )
    
  }

  if (flagRepartidor || localStorage.getItem("rol") === "2") {
    if(!flagRepartidor) {
      setRepartidorFlag(true)
    }
    return (
      <>
        <SidebarRepartidor logout={logout} />
      </>
    );
  }

  if (flagEmpresa || localStorage.getItem("rol") === "3") {
    if(!flagEmpresa) {
      setEmpresaFlag(true)
    }
    return (
      <>
        <SidebarEmpresa logout={logout} />
      </>
    );
  }

  if (flagUsuario || localStorage.getItem("rol") === "1") {
    if (!flagUsuario) {
      setUsuarioFlag(true)
    }
    return (
      <>
        <SidebarUsuario logout={logout} />
      </>
    );
  }
}

export default App