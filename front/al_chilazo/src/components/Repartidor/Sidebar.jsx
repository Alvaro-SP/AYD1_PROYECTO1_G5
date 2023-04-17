import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PerfilRepartidor } from "./Perfil";
import { PedidosPendientes } from "./PedidosPend";
import { PedidosAsignados } from "./PedidosAsig";
import "../../styles/sidebar_repartidor.css";

export function SidebarRepartidor({ logout }) {
  const [colorText, setColorText] = useState([
    "green-text text-darken-2",
    "green-text text-darken-2",
    "green-text text-darken-2",
  ]);

  const [colores, setColores] = useState(["white", "white", "white"]);

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
        newColorText[valPrev] = "green-text text-darken-2";
      }
    }

    newColorText[value] = "white-text";
    newColores[value] = "green darken-2";

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
                src="https://cdn-icons-png.flaticon.com/512/9561/9561845.png"
                alt="logo"
                className="circular responsive-img tooltipped"
                data-position="right"
                data-tooltip="Al Chilazo"
                style={{ width: "80%" }}
              />
            </li>
            <br />
            <br />
            <li>
              <Link
                to="/repartidor/MiPerfil"
                className={"center-content tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Mi Perfil"
                onClick={() => changeColor(0)}
              >
                <i className={"material-icons iconSize " + colorText[0]}>
                  contact_mail
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/repartidor/PedidosPendientes"
                className={"center-content tooltipped " + colores[1]}
                data-position="right"
                data-tooltip="Pedidos Pendientes"
                onClick={() => changeColor(1)}
              >
                <i className={"material-icons iconSize " + colorText[1]}>
                  receipt_long
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/repartidor/PedidosAsignados"
                className={"center-content tooltipped " + colores[2]}
                data-position="right"
                data-tooltip="Pedidos Asignados"
                onClick={() => changeColor(2)}
              >
                <i className={"material-icons iconSize " + colorText[2]}>pending_actions</i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/"
                className="center-content tooltipped"
                data-position="right"
                data-tooltip="Cerrar Sesion"
                onClick={logout}
              >
                <i className="material-icons iconSize green-text text-darken-2">logout</i>
              </Link>
            </li>
          </ul>
          <Routes>
            <Route path="/repartidor/MiPerfil" element={<PerfilRepartidor />} />
            <Route
              path="/repartidor/PedidosPendientes"
              element={<PedidosPendientes />}
            />
            <Route
              path="/repartidor/PedidosAsignados"
              element={<PedidosAsignados />}
            />
            <Route path="/" />
          </Routes>
        </Router>
      </aside>
    </>
  );
}
