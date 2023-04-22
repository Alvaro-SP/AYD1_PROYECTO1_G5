import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Empresas from "./empresas/Empresas";
import Productos from "./productos/Productos";
import FinalizarPedido from "./confirmarpedido/FinalizarPedido";
import Categorias from "./empresas/Categorias";

import "../../styles/sidbarcss.css";
import logo from "../../shared/logo.gif";

export function SidebarUsuario({ logout }) {
  const [valPrev, setValPrev] = useState(-1);

  const [colorText, setColorText] = useState([
    "orange-text text-darken-2",
    "orange-text text-darken-2",
    "orange-text text-darken-2",
  ]);

  const [idrestaurante, setIdRestaurante] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);

  const [colores, setColores] = useState(["white", "white", "white"]);

  useEffect(() => {
    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {
      inDuration: 200,
      outDuration: 200,
    });
  }, []);

  function establecerRestaurante(id) {
    setIdRestaurante(id);
    console.log(id);
  }

  function agregarConfirmacion(carro, total) {
    console.log(carro);
    setCarrito(carro);
    setTotalPedido(total);
  }

  const changeColor = (value) => {
    var newColores = colores;
    var newColorText = colorText;

    if (valPrev !== -1) {
      if (valPrev !== value) {
        newColores[valPrev] = "white";
        newColorText[valPrev] = "orange-text text-darken-2";
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
          <div className="sidebb">
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
            <br />
            <li>
              <Link
                to="/restaurantes"
                className={"center-content tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Mi Perfil"
                onClick={() => changeColor(0)}
              >
                <i className={"material-icons iconSize " + colorText[0]}>
                  restaurant
                </i>
              </Link>
            </li>
            <br />
          </ul>
          </div>
          <Routes>
            <Route
              path="/restaurantes"
              element={<Empresas functionapp={establecerRestaurante} />}
            />
            <Route
              path="/productos"
              element={
                <Productos
                  empresa={idrestaurante}
                  functionconfirmar={agregarConfirmacion}
                />
              }
            />
            <Route
              path="/finalizarpedido"
              element={
                <FinalizarPedido carrito={carrito} totalPedido={totalPedido} />
              }
            />
          </Routes>
        </Router>
      </aside>
    </>
  );
}
