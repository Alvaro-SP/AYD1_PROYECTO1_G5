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

        var elems = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elems, {
            inDuration: 200,
            outDuration: 200,
        });
    }, []);

    useEffect(() => {
        var elems = document.querySelectorAll("select");
        M.FormSelect.init(elems, {});
    }, [listaCategoria, categoria]);

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
        var data = { id: JSON.parse(localStorage.getItem("user")).id }
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
        setIdProducto(elemento.id);
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
                    html: "Se elimino con exito",
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

    const agregarCombo = async () => {
        let noc = "";
        listaCategoria.forEach((element) => {
            if (element.id == categoria) {
                noc = element.name;
                return;
            }
        });

        const data = {
            name: nombre,
            price: precio,
            id: JSON.parse(localStorage.getItem("user")).id,
            imagen: imagen,
            category: noc,
            categoryProduct_id: categoria,
            disponibilidad: disponibilidad,
            description: descripcion,
        };
        console.log(data);

        try {
            const result = (await axios.post(url + "addproduct", data)).data;
            console.log(result);

            if (result.res) {
                getDatos();

                M.toast({
                    html: "Se agrego con exito",
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
        let noc = "";
        listaCategoria.forEach((element) => {
            if (element.id == categoria) {
                noc = element.name;
                return;
            }
        });
        const data = {
            name: nombre,
            price: precio,
            id: JSON.parse(localStorage.getItem("user")).id,
            imagen: imagen,
            category: noc,
            categoryProduct_id: categoria,
            disponibilidad: disponibilidad,
            description: descripcion,
        };
        console.log(data);

        try {
            const result = (await axios.post(url + "updateproduct", data)).data;
            console.log(result);

            if (result.res) {
                getDatos();

                M.toast({
                    html: "Se actualizo con exito",
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
        <section>
            <div className="container">
                <div className="row">
                    <div className="col s6 offset-s3">
                        <h1 className="center-align">Combos</h1>
                    </div>
                    <div className="col s1" style={{ paddingTop: 45 }}>
                        <a
                            href="#modalAgregarCombo"
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
                                <th>Stock</th>
                                <th>Descripcion</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtrar().map((producto) => {
                                return (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>
                                            <img
                                                className="materialboxed"
                                                width="100"
                                                src={producto.imagen}
                                            />
                                        </td>
                                        <td>{producto.price}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.description}</td>
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
                                                onClick={() => eliminar(producto.id)}
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

                <div id="modalAgregarCombo" className="modal">
                    <div className="modal-content">
                        <blockquote style={{ borderRight: "solid 5px #ee6e73" }}>
                            <h4 className="center-align">AGREGAR Combo</h4>
                        </blockquote>
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <i className="material-icons prefix">business_center</i>
                                        <input
                                            onChange={(e) => setNombre(e.target.value)}
                                            id="nombreNewProducto"
                                            type="text"
                                            className="validate"
                                        />
                                        <label htmlFor="nombreNewProducto">Nombre Combo</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <i className="material-icons prefix">price_check</i>
                                        <input
                                            onChange={(e) => setPrecio(e.target.value)}
                                            id="precioNewProducto"
                                            type="number"
                                            className="validate"
                                        />
                                        <label htmlFor="precioNewProducto">Precio</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <i className="material-icons prefix">format_quote</i>
                                        <textarea
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            id="descripcionNewProducto"
                                            className="materialize-textarea"
                                        ></textarea>
                                        <label htmlFor="descripcionNewProducto">Descripcion</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <i className="material-icons prefix">image</i>
                                        <input
                                            onChange={(e) => setImagen(e.target.value)}
                                            id="imagenNewProducto"
                                            type="text"
                                            className="validate"
                                        />
                                        <label htmlFor="imagenNewProducto">Url imagen</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <i className="material-icons prefix">
                                            production_quantity_limits
                                        </i>
                                        <input
                                            onChange={(e) => setDisponibilidad(e.target.value)}
                                            id="dispNewProducto"
                                            type="number"
                                            className="validate"
                                        />
                                        <label htmlFor="dispNewProducto">Stock</label>
                                    </div>
                                </div>
                                <a
                                    href="#modalAgregarProducto"
                                    className=" modal-trigger waves-effect waves-light black-text indigo darken-4 btn-small tooltipped"
                                    data-position="rigth"
                                    data-tooltip="Nuevo Producto"
                                >
                                    <i className="material-icons white-text">
                                        drive_file_rename_outline
                                    </i>
                                </a>
                                <div className="row">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>Pollo ranchero</td>
                                                <td>5</td>
                                            </tr>
                                            <tr>
                                                <td>Pollo frito</td>
                                                <td>3</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col s8 offset-s3">
                                        <a
                                            onClick={agregarCombo}
                                            className="modal-close waves-effect waves-light btn-large green darken-3"
                                        >
                                            <i className="material-icons left">control_point</i>
                                            Agregar Nuevo Producto
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
                                        <i className="material-icons prefix">business_center</i>
                                        <input
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            id="nombreModProducto"
                                            type="text"
                                            className="validate"
                                        />
                                        <label className="active" htmlFor="nombreModProducto">
                                            Nombre Producto
                                        </label>
                                    </div>
                                </div>
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
                                        <i className="material-icons prefix">
                                            production_quantity_limits
                                        </i>
                                        <input
                                            value={disponibilidad}
                                            onChange={(e) => setDisponibilidad(e.target.value)}
                                            id="dispModProducto"
                                            type="number"
                                            className="validate"
                                        />
                                        <label className="active" htmlFor="dispModProducto">
                                            Disponibilidad
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <i className="material-icons prefix">format_quote</i>
                                        <textarea
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            id="descModProducto"
                                            value={descripcion}
                                            className="materialize-textarea"
                                        ></textarea>
                                        <label className="active" htmlFor="descModProducto">
                                            Descripcion
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <i className="material-icons prefix">image</i>
                                        <input
                                            value={imagen}
                                            onChange={(e) => setImagen(e.target.value)}
                                            id="imagenModProducto"
                                            type="text"
                                            className="validate"
                                        />
                                        <label className="active" htmlFor="imagenModProducto">
                                            Url imagen
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
                                            {listaCategoria.map((cate) => {
                                                if (cate.name == categoria) {
                                                    return (
                                                        <option selected key={cate.id} value={cate.id}>
                                                            {cate.name}
                                                        </option>
                                                    );
                                                } else {
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
