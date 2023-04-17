import { useState } from "react";
import { Start } from "./components/start_components/Start";
import { SidebarAdmin } from "./components/admin_components/Sidebar";
import { SidebarRepartidor } from "./components/Repartidor/Sidebar";

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
    );
  }

  if (flagRepartidor) {
    return (
      <>
        <SidebarRepartidor logout={logout} />
      </>
    );
  }
}

export default App;
