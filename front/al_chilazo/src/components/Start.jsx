import { useEffect } from "react";
import { Login } from "./start_components/Login";
import { RegistrarEmpresa } from "./start_components/Reg_Empresa";
import { RegistrarUsuario } from "./start_components/Reg_Usuario";
import { RegistrarRepartidor } from "./start_components/Reg_Repartidor";
import "../styles/Start.css";

export function Start() {
  useEffect(() => {
    var elem = document.getElementById("tabs-Start");
    M.Tabs.init(elem, {
      duration: 100,
    });
  });

  // ? AGREGAR LOGICA Y HOOKS

  return (
    <>
      <nav className="nav-extended indigo darken-2 white-text">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo center">
            <i className="material-icons left">local_fire_department</i>
            Al Chilazo
          </a>
        </div>
        <div className="nav-content">
          <ul
            className="tabs tabs-transparent tabs-fixed-width"
            id="tabs-Start"
          >
            <li className="tab">
              <a href="#login" className="active">
                <i className="material-icons left">login</i>
                Login
              </a>
            </li>
            <li className="tab">
              <a href="#regNeg">
                <i className="material-icons left">apartment</i>
                Registro Negocio
              </a>
            </li>
            <li className="tab">
              <a href="#regUsr">
                <i className="material-icons left">person_add</i>
                Registro Usuario
              </a>
            </li>
            <li className="tab">
              <a href="#regDel">
                <i className="material-icons left">local_shipping</i>
                Registro Repartidor
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div id="login" className="col s12 contenedor contenedor-1" style={{height: "85.2vh"}}>
        <br />
        <br />
        <Login />
      </div>

      <div id="regNeg" className="col s12 contenedor contenedor-2">
        <br />
        <br />
        <RegistrarEmpresa />
      </div>

      <div id="regUsr" className="col s12 contenedor contenedor-3">
        <br />
        <br />
        <RegistrarUsuario />
      </div>

      <div id="regDel" className="col s12 contenedor contenedor-4">
        <br />
        <br />
        <RegistrarRepartidor />
      </div>
    </>
  );
}
