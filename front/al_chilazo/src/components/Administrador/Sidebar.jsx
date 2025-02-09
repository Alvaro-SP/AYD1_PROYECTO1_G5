import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SolicitudRepartidor } from "./Solicitud_Rep";
import { SolicitudEmpresa } from "./Solicitud_Empresa";
import { RemoverUsuario } from "./Remover_Usuario";
import { RemoverRepartidor } from "./Remover_Repartidor";
import { RemoverNegocio } from "./Remover_Negocio";
import "../../styles/Administrador/SidebarAdmin.css";
import { SolicitudCambiarUbicacion } from "./Solicitud_UbRep";
import logo from "../../shared/logo.gif";
import { url } from "../../shared/url";
import axios from "axios";

export function SidebarAdmin({ logout }) {
  const [badge1, setBadge1] = useState("hide");
  const [badge2, setBadge2] = useState("hide");
  const [badge3, setBadge3] = useState("hide");
  const [valueBadge1, setValue1] = useState(0);
  const [valueBadge2, setValue2] = useState(0);
  const [valueBadge3, setValue3] = useState(0);

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
    getData();

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

  const getData = async () => {
    try {
      const result = (await axios.get(url + "/get-notify")).data;
      console.log(result.res)

      if (result.res) {
        setValue1(result.res.repcont);
        setValue2(result.res.empresacont);
        setValue3(result.res.repzonecont);
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  useEffect(() => {
    if (valueBadge1 !== 0) {
      setBadge1("");
    }

    if (valueBadge2 !== 0) {
      setBadge2("");
    }

    if (valueBadge3 !== 0) {
      setBadge3("");
    }
  }, [valueBadge1, valueBadge2, valueBadge3]);

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
          <ul id="sideAdmin" className="sidenav sidenav-fixed">
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
                to="/admin/SolicitudRepartidores"
                className={"iconContainerSideAdmin tooltipped " + colores[0]}
                data-position="right"
                data-tooltip="Solicitud Repartidores"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  changeColor(0);
                  setBadge1("hide");
                }}
              >
                <i className={"material-icons iconSideAdmin " + colorText[0]}>
                  local_shipping
                </i>
                <span className={"new badge red " + badge1}>{valueBadge1}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/SolicitudNegocio"
                className={"iconContainerSideAdmin tooltipped " + colores[1]}
                data-position="right"
                data-tooltip="Solicitud Empresas"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  changeColor(1);
                  setBadge2("hide");
                }}
              >
                <i className={"material-icons iconSideAdmin " + colorText[1]}>
                  location_city
                </i>
                <span className={"new badge red " + badge2}>{valueBadge2}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/RemoverUsuario"
                className={"iconContainerSideAdmin tooltipped " + colores[2]}
                data-position="right"
                data-tooltip="Remover Usuario"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(2)}
              >
                <i className={"material-icons iconSideAdmin " + colorText[2]}>
                  person_remove
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/RemoverNegocio"
                className={"iconContainerSideAdmin tooltipped " + colores[3]}
                data-position="right"
                data-tooltip="Remover Empresa"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(3)}
              >
                <i className={"material-icons iconSideAdmin " + colorText[3]}>
                  do_disturb_on
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/RemoverRepartidor"
                className={"iconContainerSideAdmin tooltipped " + colores[4]}
                data-position="right"
                data-tooltip="Remover Repartidor"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => changeColor(4)}
              >
                <i className={"material-icons iconSideAdmin " + colorText[4]}>
                  backspace
                </i>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/UbicacionRepartidor"
                className={"iconContainerSideAdmin tooltipped " + colores[5]}
                data-position="right"
                data-tooltip="Ubicacion Repartidor"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  changeColor(5);
                  setBadge3("hide");
                }}
              >
                <i className={"material-icons iconSideAdmin " + colorText[5]}>
                  pin_drop
                </i>
                <span className={"new badge red " + badge3}>{valueBadge3}</span>
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
                <i className="material-icons iconSideAdmin indigo-text text-darken-4">
                  logout
                </i>
              </Link>
            </li>
          </ul>
          <a href="#" data-target="sideAdmin" className="sidenav-trigger">
            <i
              className="material-icons iconSideAdmin indigo-text text-darken-4"
              style={{ position: "absolute", top: "20%", left: "5%" }}
            >
              menu
            </i>
          </a>
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
