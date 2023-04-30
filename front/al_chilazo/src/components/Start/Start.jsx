import { useEffect } from "react";
import { Login } from "./Login";
import { RegistrarEmpresa } from "./Reg_Empresa";
import { RegistrarUsuario } from "./Reg_Usuario";
import { RegistrarRepartidor } from "./Reg_Repartidor";
import "../../styles/Start/Start.css";

export function Start({ adFlag, repFlag, empFlag, userFlag, startFlag }) {
  useEffect(() => {
    var elem = document.getElementById("tabs-Start");
    M.Tabs.init(elem, {
      duration: 100,
    });
  });

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
              <a href="#loginTab" className="active">
                <div className="row">
                  <div className="col s8 offset-s3 valign-wrapper">
                    <i
                      className="material-icons left"
                      style={{ marginBottom: "0", marginRight: "25px" }}
                    >
                      login
                    </i>
                    <div className="hide-on-small-only">Login</div>
                  </div>
                </div>
              </a>
            </li>
            <li className="tab">
              <a href="#regNegTab">
                <div className="row">
                  <div className="col s8 offset-s2 valign-wrapper">
                    <i
                      className="material-icons left"
                      style={{ marginBottom: "0", marginRight: "25px" }}
                    >
                      apartment
                    </i>
                    <div className="hide-on-small-only">Registro Negocio</div>
                  </div>
                </div>
              </a>
            </li>
            <li className="tab">
              <a href="#regUsrTab">
                <div className="row">
                  <div className="col s8 offset-s2 valign-wrapper">
                    <i
                      className="material-icons left"
                      style={{ marginBottom: "0", marginRight: "25px" }}
                    >
                      person_add
                    </i>
                    <div className="hide-on-small-only">Registro Usuario</div>
                  </div>
                </div>
              </a>
            </li>
            <li className="tab">
              <a href="#regDelTab">
                <div className="row">
                  <div className="col s8 offset-s3 valign-wrapper">
                    <i
                      className="material-icons left"
                      style={{ marginBottom: "0", marginRight: "25px" }}
                    >
                      local_shipping
                    </i>
                    <div className="hide-on-small-only">
                      Registro Repartidor
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        id="loginTab"
        className="contenedor-1"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <br />
        <br />
        <Login
          adFlag={adFlag}
          empFlag={empFlag}
          repFlag={repFlag}
          userFlag={userFlag}
          startFlag={startFlag}
        />
      </div>

      <div
        id="regNegTab"
        className="contenedor-2"
        style={{ maxHeight: "100%", height: "100%" }}
      >
        <br />
        <br />
        <RegistrarEmpresa />
      </div>

      <div
        id="regUsrTab"
        className="contenedor-3"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <br />
        <br />
        <RegistrarUsuario />
      </div>

      <div
        id="regDelTab"
        className="contenedor-4"
        style={{ maxHeight: "100%", height: "100%" }}
      >
        <br />
        <br />
        <RegistrarRepartidor />
      </div>
    </>
  );
}
