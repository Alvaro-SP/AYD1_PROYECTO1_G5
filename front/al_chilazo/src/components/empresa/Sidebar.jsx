import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../../styles/sidebar_admin.css";
import Pedido from "./Pedido";
import Categoria from "./Categoria";
import Producto from "./Producto";
import logo from '../../shared/logo.gif'

export function SidebarEmpresa() {
  const [prueba, setPrueba] = useState("hide");
  const [valPrev, setValPrev] = useState(-1);
  const [colorText, setColorText] = useState([
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
  ]);

  useEffect(() => {
    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {
      inDuration: 200,
      outDuration: 200,
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
                alt="bandera"
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
                to="/empresa"
                className={"center-content tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Pedidos"
                onClick={() => changeColor(0)}
              >
                <i className={"material-icons iconSize " + colorText[0]}>
                    shopping_cart
                </i>
                <span className={"new badge green " + prueba}>4</span>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/empresa/Categoria"
                className={"center-content tooltipped " + colores[1]}
                data-position="right"
                data-tooltip="Categoria"
                onClick={() => changeColor(1)}
              >
                <i className={"material-icons iconSize " + colorText[1]}>
                  apps
                </i>
              </Link>
            </li>
            <br />
            <li>
              <Link
                to="/empresa/Producto"
                className={"center-content tooltipped " + colores[2]}
                data-position="right"
                data-tooltip="Productos"
                onClick={() => changeColor(2)}
              >
                <i className={"material-icons iconSize " + colorText[2]}>
                  inventory_2
                </i>
              </Link>
            </li>
            <br />
            
            <br />
            {/* <li>
              <Link
                to="/admin/Reportes"
                className={"center-content tooltipped " + colores[5]}
                data-position="right"
                data-tooltip="Reportes"
                onClick={() => changeColor(5)}
              >
                <i className={"material-icons iconSize " + colorText[5]}>
                  flag
                </i>
                <span className={"new badge teal " + prueba}>2</span>
              </Link>
            </li> */}
          </ul>
          <Routes>
            <Route
              path="/empresa"
              element={<Pedido />}
            />
            <Route
              path="/empresa/Categoria"
              element={<Categoria />}
            />
            <Route path="/empresa/Producto" element={<Producto />} />
          </Routes>
        </Router>
      </aside>
    </>
  );
}
