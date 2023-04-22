import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SolicitudRepartidor } from "./Solicitud_Rep";
import { SolicitudEmpresa } from "./Solicitud_Empresa";
import { RemoverUsuario } from "./Remover_Usuario";
import { RemoverRepartidor } from "./Remover_Repartidor";
import { RemoverNegocio } from "./Remover_Negocio";
import "../../styles/sidebar_admin.css";
import { SolicitudCambiarUbicacion } from "./Solicitud_UbRep";
import logo from '../../shared/logo.gif'
export function SidebarAdmin({ logout }) {
  const [valPrev, setValPrev] = useState(-1);
  const [colorText, setColorText] = useState([
    "indigo-text text-darken-1",
    "indigo-text text-darken-1",
    "indigo-text text-darken-1",
    "indigo-text text-darken-1",
    "indigo-text text-darken-1",
    "indigo-text text-darken-1",
    "indigo-text text-darken-1",
  ]);

  const [colores, setColores] = useState([
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ]);

  useEffect(() => {
    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {
      inDuration: 200,
      outDuration: 200,
    });
  }, []);

  const changeColor = (value) => {
    var newColores = colores;
    var newColorText = colorText;

    if (valPrev !== -1) {
      if (valPrev !== value) {
        newColores[valPrev] = "white";
        newColorText[valPrev] = "indigo-text text-darken-1";
      }
    }

    newColorText[value] = "white-text";
    newColores[value] = "indigo darken-1";

    setColorText(newColorText);
    setColores(newColores);
    setValPrev(value);
  };

  return (
    <>
      <aside>
        <Router>
          <ul id="sidenav" className="sidenav sidenav-fixed">
            <li className="center-content">
              <img
                src={logo}
                alt="logo"
                className="circular responsive-img tooltipped"
                data-position="right"
                data-tooltip="Al Chilazo"
                style={{ width: "80%" }}
              />
            </li>
            <br />
            <div className="divider"></div>
            <br />
            <li>
              <Link
                to="/admin/SolicitudRepartidores"
                className={"center-content tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Solicitud Repartidores"
                onClick={() => changeColor(0)}
              >
                <i className={"material-icons iconSize " + colorText[0]}>
                  local_shipping
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/admin/SolicitudNegocio"
                className={"center-content tooltipped " + colores[1]}
                data-position="right"
                data-tooltip="Solicitud Empresas"
                onClick={() => changeColor(1)}
              >
                <i className={"material-icons iconSize " + colorText[1]}>
                  location_city
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/admin/RemoverUsuario"
                className={"center-content tooltipped " + colores[2]}
                data-position="right"
                data-tooltip="Remover Usuario"
                onClick={() => changeColor(2)}
              >
                <i className={"material-icons iconSize " + colorText[2]}>
                  person_remove
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/admin/RemoverNegocio"
                className={"center-content tooltipped " + colores[3]}
                data-position="right"
                data-tooltip="Remover Empresa"
                onClick={() => changeColor(3)}
              >
                <i className={"material-icons iconSize " + colorText[3]}>
                  do_disturb_on
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/admin/RemoverRepartidor"
                className={"center-content tooltipped " + colores[4]}
                data-position="right"
                data-tooltip="Remover Repartidor"
                onClick={() => changeColor(4)}
              >
                <i className={"material-icons iconSize " + colorText[4]}>
                  backspace
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/admin/UbicacionRepartidor"
                className={"center-content tooltipped " + colores[5]}
                data-position="right"
                data-tooltip="Ubicacion Repartidor"
                onClick={() => changeColor(5)}
              >
                <i className={"material-icons iconSize " + colorText[5]}>
                  pin_drop
                </i>
              </Link>
            </li>
            <br />
            {/* <li>
              <Link
                to="/admin/Reportes"
                className={"center-content tooltipped " + colores[6]}
                data-position="right"
                data-tooltip="Reportes"
                onClick={() => changeColor(6)}
              >
                <i className={"material-icons iconSize " + colorText[6]}>
                  flag
                </i>
                <span className={"new badge teal " + prueba}>2</span>
              </Link>
            </li> */}
            <li>
              <Link
                to="/"
                className="center-content tooltipped"
                data-position="right"
                data-tooltip="Cerrar Sesion"
                onClick={logout}
              >
                <i className="material-icons iconSize indigo-text text-darken-4">logout</i>
              </Link>
            </li>
          </ul>
          <Routes>
            <Route
              path="/admin/SolicitudRepartidores"
              element={<SolicitudRepartidor />}
            />
            <Route
              path="/admin/SolicitudNegocio"
              element={<SolicitudEmpresa />}
            />
            <Route path="/admin/RemoverUsuario" element={<RemoverUsuario />} />
            <Route
              path="/admin/RemoverRepartidor"
              element={<RemoverRepartidor />}
            />
            <Route path="/admin/RemoverNegocio" element={<RemoverNegocio />} />
            <Route
              path="/admin/UbicacionRepartidor"
              element={<SolicitudCambiarUbicacion />}
            />
            <Route path="/" />
          </Routes>
        </Router>
      </aside>
    </>
  );
}
