import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export default function Producto() {
  const [listaCategoria, setListaCategoria] = useState([]);
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
  }, []);

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  }, [listaCategoria,categoria]);
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
    var data = { id: 1 };
    try {
      const result = (await axios.post(url + "products-empresa", data)).data;
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
    var data = {
      id: 1 /*Se debe cambiar por el de sesion empresa */,
    };
    try {
      const result = (
        await axios.post(url + "categoriasproducto-empresa", data)
      ).data;
      console.log(result);

      if (result.res) {
        setListaCategoria(result.res);
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
    setIdProducto(elemento.id)
    setNombre(elemento.name);
    setPrecio(elemento.precio);
    setImagen(elemento.imagen);
    setCategoria(elemento.categoryProduct_id);
    setDisponibilidad(elemento.disponibilidad);
    setDescripcion(elemento.description);
    console.log("Datos selecionados");
  };

  const eliminar = async (idE) => {
    const data = {
      id: idE,
    };
    console.log("para eliminar");

    try {
            const result = (await axios.post(url + "deleteproduct", data)).data;
            console.log(result);

            if (result.res) {
                getDatos();

                M.toast({
                    html: 'Se elimino con exito',
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
    let noc=''
    listaCategoria.forEach(element => {
      if(element.id==categoria){
        noc=element.name;
        return;
      }
    });
    const data = {
      name: nombre,
      price: precio,
      id: 1,
      imagen: imagen,
      category: noc,
      categoryProduct_id: categoria,
      disponibilidad: disponibilidad,
      description: descripcion
    };
    console.log(data);

    try {
            const result = (await axios.post(url + "addproduct", data)).data;
            console.log(result);

            if (result.res) {
                getDatos();

                M.toast({
                    html: 'Se agrego con exito',
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
    let noc=''
    listaCategoria.forEach(element => {
      if(element.id==categoria){
        noc=element.name;
        return;
      }
    });
    const data = {
      name: nombre,
      price: precio,
      id: idProducto,
      imagen: imagen,
      category: noc,
      categoryProduct_id: categoria,
      disponibilidad: disponibilidad,
      description: descripcion
    };
    console.log(data);

    try {
            const result = (await axios.post(url + "updateproduct", data)).data;
            console.log(result);

            if (result.res) {
                getDatos();

                M.toast({
                    html: 'Se actualizo con exito',
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

  const filtrar = () => {
    if (parseInt(filtro) === 0) {
      return listado;
    }
    return listado.filter((dato) => {
      return dato.categoryProduct_id === parseInt(filtro);
    });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s6">
            <h1>Productos</h1>
            <a
              href="#modalAgregarProducto"
              className="btn-floating btn-large waves-effect waves-light indigo darken-1 modal-trigger"
            >
              <i className="material-icons">queue</i>
            </a>
          </div>

          <div className="col s6" style={{ paddingTop: 50 }}>
            <div className="col">
              <div className="row">
                <div className="input-field inline">
                  <select
                    onChange={(e) => setFiltro(e.target.value)}
                    defaultValue={""}
                  >
                    <option value="0">Ninguno</option>
                    {listaCategoria.map((categoria) => {
                        return (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.name}
                          </option>
                        );
                      })}
                  </select>
                  <label>Buscar por categoria</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <table className="responsive-table highlight grey lighten-4">
            <thead className="indigo darken-1 white-text">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Disponibilidad</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {filtrar().map((pelicula) => {
                return (
                  <tr key={pelicula.id}>
                    <td>{pelicula.id}</td>
                    <td>{pelicula.name}</td>
                    <td>
                      <img
                        className="materialboxed"
                        width="100"
                        src={pelicula.imagen}
                      />
                    </td>
                    <td>{pelicula.precio}</td>
                    <td>{pelicula.disponibilidad}</td>
                    <td>{pelicula.description}</td>
                    <td>{pelicula.categoria}</td>
                    <td>
                      <a
                        href="#modalModificarProducto"
                        className=" modal-trigger waves-effect waves-light black-text yellow btn-small"
                        onClick={() => seleccionar(pelicula)}
                      >
                        Editar
                      </a>
                      <a
                        className="waves-effect waves-light red btn-small"
                        onClick={() => eliminar(pelicula.id)}
                      >
                        Eliminar
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
            <h4>Agregar Producto</h4>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      onChange={(e) => setNombre(e.target.value)}
                      id="nombre"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="nombre">Nombre Producto</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      onChange={(e) => setPrecio(e.target.value)}
                      id="precio"
                      type="number"
                      className="validate"
                    />
                    <label htmlFor="precio">Precio</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      onChange={(e) => setDescripcion(e.target.value)}
                      id="descripcionm"
                      className="materialize-textarea"
                    ></textarea>
                    <label htmlFor="descripcionm">Descripcion</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      onChange={(e) => setImagen(e.target.value)}
                      id="imagen"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="imagen">Url imagen</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      onChange={(e) => setDisponibilidad(e.target.value)}
                      id="disponibilidad"
                      type="number"
                      className="validate"
                    />
                    <label htmlFor="disponibilidad">Disponibilidad</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <select
                      onChange={(e) => setCategoria(e.target.value)}
                      defaultValue={""}
                    >
                      <option value="0">Ninguno</option>
                      {listaCategoria.map((categoria) => {
                        return (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.name}
                          </option>
                        );
                      })}
                    </select>
                    <label>Selecionar Categoria</label>
                  </div>
                </div>

                <a
                  onClick={agregarProducto}
                  className="modal-close waves-effect waves-light btn-small"
                >Agregar</a>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>

        <div id="modalModificarProducto" className="modal">
          <div className="modal-content">
            <h4>Modificar Producto</h4>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      id="nombrem"
                      type="text"
                      className="validate"
                    />
                    <label className="active" htmlFor="nombrem">Nombre Producto</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      id="preciom"
                      type="number"
                      className="validate"
                    />
                    <label className="active" htmlFor="preciom">Precio</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      value={disponibilidad}
                      onChange={(e) => setDisponibilidad(e.target.value)}
                      id="disponibilidadm"
                      type="number"
                      className="validate"
                    />
                    <label className="active"  htmlFor="disponibilidadm">Disponibilidad</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      onChange={(e) => setDescripcion(e.target.value)}
                      id="descripcionm"
                      value={descripcion}
                      className="materialize-textarea"
                    ></textarea>
                    <label className="active"  htmlFor="descripcionm">Descripcion</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      value={imagen}
                      onChange={(e) => setImagen(e.target.value)}
                      id="imagenm"
                      type="text"
                      className="validate"
                    />
                    <label className="active"  htmlFor="imagenm">Url imagen</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <select
                      onChange={(e) => setCategoria(e.target.value)}
                      
                      value={categoria}
                    >
                      {listaCategoria.map((cate) => {
                        if(cate.name==categoria){
                          return (
                            <option selected key={cate.id} value={cate.id}>
                              {cate.name}
                            </option>
                          );
                        }else{
                          return (
                            <option key={cate.id} value={cate.id}>
                              {cate.name}
                            </option>
                          );
                        }
                        
                      })}
                    </select>
                    <label>Selecionar Categoria</label>
                  </div>
                </div>

                <a
                  onClick={modificarProducto}
                  className="modal-close waves-effect waves-light btn-small"
                >
                  Modificar
                </a>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
