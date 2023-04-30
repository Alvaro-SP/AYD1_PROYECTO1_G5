import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PerfilRepartidor } from "./Perfil";
import { PedidosPendientes } from "./PedidosPend";
import { PedidosAsignados } from "./PedidosAsig";
import "../../styles/Repartidor/SidebarRepartidor.css";
import logo from "../../shared/logo.gif";

export function SidebarRepartidor({ logout }) {
  const [valPrev, setValPrev] = useState(-1);

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

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {
      draggable: true,
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
          <ul id="sideRep" className="sidenav sidenav-fixed">
            <li className="center-content">
              <img
                src={logo}
                alt="logo"
                className="tooltipped"
                data-position="right"
                data-tooltip="Al Chilazo"
                style={{ width: "80%", paddingTop: "15px" }}
              />
            </li>
            <li>
              <Link
                to="/repartidor/MiPerfil"
                className={"iconContinerSideRep tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Mi Perfil"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(0)}
              >
                <i
                  className={
                    "material-icons iconSizeRepartidor " + colorText[0]
                  }
                >
                  contact_mail
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/repartidor/PedidosPendientes"
                className={"iconContinerSideRep tooltipped " + colores[1]}
                data-position="right"
                data-tooltip="Pedidos Pendientes"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(1)}
              >
                <i
                  className={
                    "material-icons iconSizeRepartidor " + colorText[1]
                  }
                >
                  receipt_long
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/repartidor/PedidosAsignados"
                className={"iconContinerSideRep tooltipped " + colores[2]}
                data-position="right"
                data-tooltip="Pedidos Asignados"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(2)}
              >
                <i
                  className={
                    "material-icons iconSizeRepartidor " + colorText[2]
                  }
                >
                  pending_actions
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="iconContinerSideRep tooltipped"
                data-position="right"
                data-tooltip="Cerrar Sesion"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={logout}
              >
                <i className="material-icons iconSizeRepartidor green-text text-darken-2">
                  logout
                </i>
              </Link>
            </li>
          </ul>
          <a href="#" data-target="sideRep" className="sidenav-trigger">
            <i
              className="material-icons iconSideAdmin green-text text-darken-4"
              style={{ position: "absolute", top: "20%", left: "5%" }}
            >
              menu
            </i>
          </a>
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
