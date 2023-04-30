import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../../styles/Empresa/SidebarEmpresa.css";
import Pedido from "./Pedido";
import Categoria from "./Categoria";
import Producto from "./Producto";
import logo from "../../shared/logo.gif";

export function SidebarEmpresa({ logout }) {
  const [valPrev, setValPrev] = useState(-1);
  const [colorText, setColorText] = useState([
    "red-text text-darken-1",
    "red-text text-darken-1",
    "red-text text-darken-1",
    "red-text text-darken-1",
    "red-text text-darken-1",
    "red-text text-darken-1",
  ]);

  const [colores, setColores] = useState([
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

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {
      draggable: true,
    });
  });

  setTimeout(() => {
    setPrueba("");
  }, 5000);

  const changeColor = (value) => {
    var newColores = colores;
    var newColorText = colorText;

    if (valPrev !== -1) {
      if (valPrev !== value) {
        newColores[valPrev] = "white";
        newColorText[valPrev] = "red-text text-darken-1";
      }
    }

    newColorText[value] = "white-text";
    newColores[value] = "red darken-1";

    setColorText(newColorText);
    setColores(newColores);
    setValPrev(value);
  };

  return (
    <>
      <aside>
        <Router>
          <ul id="sideEmpresa" className="sidenav sidenav-fixed">
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
                to="/empresa"
                className={"iconContainerSideEmpresa tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Pedidos"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(0)}
              >
                <i className={"material-icons iconSideEmpresa " + colorText[0]}>
                  shopping_cart
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/empresa/Categoria"
                className={"iconContainerSideEmpresa tooltipped " + colores[1]}
                data-position="right"
                data-tooltip="Categoria"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(1)}
              >
                <i className={"material-icons iconSideEmpresa " + colorText[1]}>
                  apps
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/empresa/Producto"
                className={"iconContainerSideEmpresa tooltipped " + colores[2]}
                data-position="right"
                data-tooltip="Productos"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(2)}
              >
                <i className={"material-icons iconSideEmpresa " + colorText[2]}>
                  inventory_2
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="iconContainerSideAdmin tooltipped"
                data-position="right"
                data-tooltip="Cerrar Sesion"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={logout}
              >
                <i className="material-icons iconSideAdmin red-text text-darken-4">
                  logout
                </i>
              </Link>
            </li>
          </ul>
          <a href="#" data-target="sideEmpresa" className="sidenav-trigger">
            <i
              className="material-icons iconSideAdmin indigo-text text-darken-4"
              style={{ position: "absolute", top: "20%", left: "5%" }}
            >
              menu
            </i>
          </a>
          <Routes>
            <Route path="/empresa" element={<Pedido />} />
            <Route path="/empresa/Categoria" element={<Categoria />} />
            <Route path="/empresa/Producto" element={<Producto />} />
          </Routes>
        </Router>
      </aside>
    </>
  );
}
