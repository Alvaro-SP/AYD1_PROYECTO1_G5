import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export default function Ofertas() {
  const [listadoProductos, setListadoProductos] = useState([]);
  const [listado, setListado] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0.0);
  const [empresa, setEmpresa] = useState(0);
  const [imagen, setImagen] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [categoria, setCategoria] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(0);
  const [filtro, setFiltro] = useState(0);

  useEffect(() => {
    getDatos();

    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {
      inDuration: 200,
      outDuration: 200,
    });
  }, []);

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  }, [listadoProductos, categoria]);
  const getDatos = async () => {
    await getData();
    await getData2();
    M.AutoInit();
  };
  const getData = async () => {
    /*var lis = [
      {
        id: 1,
        name: "leche",
        price: 10.2,
        categoria: 1,
        nombreCategoria: "Lacteo",
        imagen:
          "https://lala.com.gt/wp-content/uploads/2019/04/0-colesterol-425-ml.png",
      },
      {
        id: 2,
        name: "leche",
        price: 10.2,
        categoria: 2,
        nombreCategoria: "Carne",
        imagen:
          "https://lala.com.gt/wp-content/uploads/2019/04/0-colesterol-425-ml.png",
      },
      {
        id: 3,
        name: "leche",
        price: 10.2,
        categoria: 3,
        nombreCategoria: "Huevos",
        imagen:
          "https://lala.com.gt/wp-content/uploads/2019/04/0-colesterol-425-ml.png",
      },
    ];
    setListado(lis);*/
    var data = { id: JSON.parse(localStorage.getItem("user")).id }
    try {
      const result = (await axios.post(url + "getOfertasByEmpresa", data)).data;
      console.log(result);

      if (result.res) {
        setListado(result.res);
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };
  const getData2 = async () => {
    var data = { id: JSON.parse(localStorage.getItem("user")).id }
    try {
      const result = (
        await axios.post(url + "products-empresa", data)
      ).data;
      console.log(result);

      if (result.res) {
        setListadoProductos(result.res);
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };
  const seleccionar = async (elemento) => {
    setIdProducto(elemento.idOferta);
    setNombre(elemento);
    setPrecio(elemento.nuevoPrice);
    console.log("Datos selecionados");
  };

  const eliminar = async (idE) => {

    const data = {
      id: idE,
    };
    console.log("para eliminar");
    console.log(data)
    try {
      const result = (await axios.post(url + "deleteOferta", data)).data;
      console.log(result);

      if (result.res) {
        getDatos();

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  const agregarProducto = async () => {
    const data = {
      price: precio,
      id: categoria
    };
    console.log(data);

    try {
      const result = (await axios.post(url + "addOferta", data)).data;
      console.log(result);

      if (result.res) {
        getDatos();

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  const modificarProducto = async () => {
    
    const data = {
      price: precio,
      id: idProducto
    };
    console.log(data);

    try {
      const result = (await axios.post(url + "updateOferta", data)).data;
      console.log(result);

      if (result.res) {
        getDatos();

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1 className="center-align">OFERTAS</h1>
          </div>
          <div className="col s1" style={{ paddingTop: 45 }}>
            <a
              href="#modalAgregarProducto"
              className="btn-floating btn-large waves-effect waves-light red darken-1 modal-trigger tooltipped"
              data-position="right"
              data-tooltip="Nuevo Producto"
            >
              <i className="material-icons">queue</i>
            </a>
          </div>
        </div>
        <div className="row">
          <table className="centered highlight grey lighten-4">
            <thead className="red darken-1 white-text">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Oferta</th>
                <th>Disponibilidad</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {listado.map((producto) => {
                return (
                  <tr key={producto.idOferta}>
                    <td>{producto.idOferta}</td>
                    <td>{producto.name}</td>
                    <td>
                      <img
                        className="materialboxed"
                        width="100"
                        src={producto.imagen}
                      />
                    </td>
                    <td>{producto.price}</td>
                    <td>{producto.nuevoPrice}</td>
                    <td>{producto.disponibilidad}</td>
                    <td>{producto.description}</td>
                    <td>{producto.category}</td>
                    <td>
                      <a
                        href="#modalModificarProducto"
                        className=" modal-trigger waves-effect waves-light black-text indigo darken-4 btn-small tooltipped"
                        data-position="bottom"
                        data-tooltip="Editar"
                        onClick={() => seleccionar(producto)}
                      >
                        <i className="material-icons white-text">
                          drive_file_rename_outline
                        </i>
                      </a>
                      <a
                        className="waves-effect waves-light red btn-small tooltipped"
                        data-position="bottom"
                        data-tooltip="Eliminar"
                        onClick={() => eliminar(producto.idOferta)}
                      >
                        <i className="material-icons">delete_forever</i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div id="modalAgregarProducto" className="modal">
          <div className="modal-content">
            <blockquote style={{ borderRight: "solid 5px #ee6e73" }}>
              <h4 className="center-align">AGREGAR PRODUCTO</h4>
            </blockquote>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s10 offset-s1">
                    <i className="material-icons prefix">price_check</i>
                    <input
                      onChange={(e) => setPrecio(e.target.value)}
                      id="precioNewProducto"
                      type="number"
                      className="validate"
                    />
                    <label htmlFor="precioNewProducto">Nuevo precio</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s10 offset-s1">
                    <i className="material-icons prefix">category</i>
                    <select
                      onChange={(e) => setCategoria(e.target.value)}
                      defaultValue={""}
                      id="catNewProducto"
                    >
                      <option value="">Ninguno</option>
                      {listadoProductos.map((categoria) => {
                        return (
                          <option key={categoria.id} data-icon={categoria.imagen} value={categoria.id}>
                            {categoria.id+"--"+categoria.name+"--Precio:"+categoria.precio}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="catNewProducto">Selecionar Producto</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s8 offset-s3">
                    <a
                      onClick={agregarProducto}
                      className="modal-close waves-effect waves-light btn-large green darken-3"
                    >
                      <i className="material-icons left">control_point</i>
                      Agregar Nueva Oferta
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="modalModificarProducto" className="modal">
          <div className="modal-content">
            <blockquote style={{ borderRight: "solid 5px #ee6e73" }}>
              <h4 className="center-align">MODIFICAR PRODUCTO</h4>
            </blockquote>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">price_check</i>
                    <input
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      id="precioModProducto"
                      type="number"
                      className="validate"
                    />
                    <label className="active" htmlFor="precioModProducto">
                      Precio
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">category</i>
                    <select
                      onChange={(e) => setCategoria(e.target.value)}
                      defaultValue={categoria}
                    >
                      {listadoProductos.map((categoria) => {
                        if (categoria.id == categoria) {
                          return (
                            <option selected key={categoria.id} data-icon={categoria.imagen} value={categoria.id}>
                              {categoria.id+"--"+categoria.name+"--Precio:"+categoria.precio}
                            </option>
                          );
                        } else {
                          return (
                            <option key={categoria.id} data-icon={categoria.imagen} value={categoria.id}>
                              {categoria.id+"--"+categoria.name+"--Precio:"+categoria.precio}
                            </option>
                          );
                        }
                      })}
                    </select>
                    <label>Selecionar Producto</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s8 offset-s4">
                    <a
                      onClick={modificarProducto}
                      className="modal-close waves-effect waves-light btn-large green darken-3"
                    >
                      <i className="material-icons left">drive_file_rename_outline</i>
                      Modificar Producto
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
