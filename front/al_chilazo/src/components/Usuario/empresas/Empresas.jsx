import TarjetasEmpresa from "./TarjetaEmpresa";
import { useEffect, useState } from "react";
import { url } from "../../../shared/url";
import "../../../styles/Empresas.css";
import M from "materialize-css";
import axios from "axios";
import { departamentos } from "./departamentos";

function Empresas(props) {
  const { functionapp } = props;
  const [busqueda, setBusqueda] = useState("");
  const categorias = [
    "Restaurantes y Comida Rapida",
    "Cafeterias",
    "Tiendas de Conveniencia",
    "Supermercados",
  ];
  const [categoria, setCategoria] = useState("Todas");
  const [departamento, setDepartamento] = useState("Guatemala");
  const [empresas, setEmpresas] = useState([]);


  useEffect(() => {
    axios.get(url + "empresas-category").then((res) => {
      console.log("se recibe: ", res.data.res);
      setEmpresas(res.data.res);
    });
    M.AutoInit();
  }, []);

  const filtrarEmpresas = () => {
    let empresasFiltradas;
    if (categoria !== "Todas") {
      empresasFiltradas = empresas.filter((empresa) => {
        return empresa.category === categoria;
      });
    } else {
      empresasFiltradas = empresas;
    }

    if (departamento !== "Guatemala") {
      empresasFiltradas = empresas.filter((empresa) => {
        return empresa.depto === departamento;
      });
    } else {
      empresasFiltradas = empresasFiltradas;
    }


    if (busqueda !== "") {
      return empresasFiltradas.filter((empresa) => {
        return empresa.name.toLowerCase().includes(busqueda.toLowerCase());
      });
    } else {
      return empresasFiltradas;
    }
  };

  function handleClickId(id) {
    console.log("empresa id desde componente empresa: " + id);
    functionapp(id);
  }

  return (
    <div className="contenedor-general-empresas">
      <div className="container-input">
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input
            id="icon_prefix"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <label htmlFor="search">Busqueda</label>
        </div>
        <ul id="dropdown2" className="dropdown-content red darken-2">
          <li key="Todas" onClick={() => setCategoria("Todas")}>
            <a className="white-text">Todas</a>
          </li>
          {categorias.map((empresa) => (
            <li key={empresa} onClick={() => setCategoria(empresa)}>
              <a className="white-text">{empresa}</a>
            </li>
          ))}
        </ul>
        <a
          className="btn dropdown-trigger red darken-2"
          data-target="dropdown2"
        >{`Categoria: ${categoria}`}<i className="material-icons right">arrow_drop_down</i></a>
      </div>
      <div className="dropdown-departamentos">
        <ul id="dropdown3" className="dropdown-content red darken-2">
          <li key="Guatemala" onClick={() => setDepartamento("Guatemala")}>
            <a className="white-text">Guatemala</a>
          </li>
          {departamentos.map((dpto) => (
            <li key={dpto} onClick={() => setDepartamento(dpto)}>
              <a className="white-text">{dpto}</a>
            </li>
          ))}
        </ul>
        <a
          className="btn dropdown-trigger red darken-2"
          data-target="dropdown3"
        >{`Departamento: ${departamento}`}<i className="material-icons right">arrow_drop_down</i></a>
      </div>
      <row>
        <div className="contenedor-empresas">
          <div className="tarjetas-empresa">
            {filtrarEmpresas().map((empresa) => (
              <TarjetasEmpresa
                key={empresa.id}
                empresa={empresa}
                metodo={handleClickId}
              />
            ))}
          </div>
        </div>
      </row>
    </div>
  );
}

export default Empresas;
