import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Empresas from "./empresas/Empresas";
import Productos from "./productos/Productos";
import FinalizarPedido from "./confirmarpedido/FinalizarPedido";
import HistorialPedidos from "./historialpedidos/HistorialPedidos";
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
    newColores[value] = "orange darken-2";

    setColorText(newColorText);
    setColores(newColores);
    setValPrev(value);
  };
  //este array solo es para probar el endpoint de historial de pedidos en lo que se tiene el endpoint de historial de pedidos
  
  const orders = [
    {
      id: 1,
      items: [
        { id: 1, name: "Hamburguesa de carne" },
        { id: 2, name: "Papas fritas" },
        { id: 3, name: "Refresco" }
      ],
      total: 150.0
    },
    {
      id: 2,
      items: [
        { id: 4, name: "Hamburguesa de pollo" },
        { id: 5, name: "Aros de cebolla" },
        { id: 6, name: "Refresco" }
      ],
      total: 200.0
    }
  ];
  
  return (
    <>
      <aside>
        <Router>
          <ul id="sidenav" className="sidenav sidenav-fixed">
            <li className="center-content">
              <img
                src={logo}
                alt="logo"
                className="tooltipped"
                data-position="right"
                data-tooltip="Al Chilazo"
                style={{ width: "80%", paddingTop: "15px"}}
              />
            </li>
            <br />
            <br />
            <li>
              <Link
                to="/"
                className={"iconContainerSideUser tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Restaurantes"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(0)}
              >
                <i className={"material-icons iconSideUser " + colorText[0]}>
                  restaurant
                </i>
              </Link>
            </li>
            <li>
            <Link
                to="/historialuser"
                className={"iconContainerSideUser tooltipped " + colores[1]}
                data-position="right"
                data-tooltip="Historial de pedidos"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(1)}
              >
                <i className={"material-icons iconSideUser " + colorText[1]}>
                history
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="iconContainerSideUser tooltipped"
                data-position="right"
                data-tooltip="Cerrar Sesion"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={logout}
              >
                <i className="material-icons iconSideUser orange-text text-darken-4">
                  logout
                </i>
              </Link>
            </li>
          </ul>
          <Routes>
            <Route
              path="/"
              element={<Empresas functionapp={establecerRestaurante} />}
            />
            <Route
              path="/productos"
              element={
                <Productos
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
            <Route
              path="/historialuser"
              element={<HistorialPedidos />}
            />   
          </Routes>
        </Router>
      </aside>
    </>
  );
}
