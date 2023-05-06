import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export default function Combo() {
    const [dc, setdc] = useState([]);
    const [listado, setListado] = useState([]);
    const [nombre, setNombre] = useState("");
    const [nombreP, setNombreP] = useState("");
    const [cantidadP, setCantidadP] = useState(0);
    const [precio, setPrecio] = useState(0.0);
    const [empresa, setEmpresa] = useState(0);
    const [imagen, setImagen] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [categoria, setCategoria] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const [disponibilidad, setDisponibilidad] = useState(0);
    /*Para editar un producto del combo*/
    const [me,setme] = useState(false);
    const [pr,setPr] = useState({})
    const [sn,setsn] =useState('')
    const [sc,setsc] =useState(0)
    const [dc2, setdc2] = useState([]);
    const [filtro, setFiltro] = useState(0);
    const [paeditar,setpeditar]= useState([]);
    const [paeliminar,setpae]= useState([]);
    useEffect(() => {
        getDatos();

        var elems = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elems, {
            inDuration: 200,
            outDuration: 200,
        });
    }, []);


    const getDatos = async () => {
        await getData();
        //await getData2();
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
            const result = (await axios.post(url + "getCombosEmpresa", data)).data;
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
    const seleccionar = async (elemento) => {
        setIdProducto(elemento.id);
        setNombreP("");
        setCantidadP(0);
        setNombre(elemento.nombre);
        setPrecio(elemento.price);
        setImagen(elemento.imagen);
        setDisponibilidad(elemento.stock);
        setDescripcion(elemento.description);
        setdc2(elemento.products)
        setdc([])
        setpae([])
        setpeditar([])
        setPr({})
        setme(false)
        console.log("Datos selecionados");
    };
    const seleccionar2 = async (elemento) => {
        setPr(elemento);
        setsc(elemento.cant)
        setsn(elemento.name)
        setme(true);
    };
    const eliminarp = async (id) => {
        console.log("eliminar")
        let dato = dc2.find((element) => {
            return element.id === id;
        })
        setpae(paeliminar => paeliminar.concat(dato))

        setdc2(dc2.filter((item) => item.id !== id))
        setme(false)
    };
    const modificarp = async (id) => {
        console.log(id)
        let dato = dc2.find((element) => {
            return element.id === id;
        })
        console.log(dato)
        dato.cant=sc;
        dato.name=sn;
        setpeditar(paeditar => paeditar.concat(dato))
        setdc2(dc2.filter((item) => item.id !== id))
        setme(false)
    };
    const sacarA = async (id) => {
        setdc(dc.filter((_, i) => i !== id))
    };
    
    const eliminar = async (idE,nombre) => {
        const data = {
            id: idE,
            nombre: nombre
        };
        console.log("para eliminar");

        try {
            const result = (await axios.post(url + "deletecombo", data)).data;
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
    
    const agregarP = async () => {
        var ps = { nombre: nombreP, cantidad: cantidadP }
        setdc(dc => dc.concat(ps))
        console.log(ps)
        setNombreP("");
        setCantidadP(0);
    }
    const desselect = async () => {
        setme(false)
    }
    const agregarCombo = async () => {

        const data = {
            name: nombre,
            price: precio,
            id: JSON.parse(localStorage.getItem("user")).id,
            imagen: imagen,
            disponibilidad: disponibilidad,
            description: descripcion,
            products: dc
        };
        console.log(data);

        try {
            const result = (await axios.post(url + "addcombo", data)).data;
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
            name: nombre,
            price: precio,
            id: idProducto,
            imagen: imagen,
            disponibilidad: disponibilidad,
            description: descripcion,
            pnuevos: dc,
            pmodificar: paeditar,
            peliminar: paeliminar
        };
        console.log(data);

        try {
            const result = (await axios.post(url + "updatecombo", data)).data;
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
                            {listado.map((producto) => {
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
                                                onClick={() => eliminar(producto.id,producto.nombre)}
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
                                <div className="row">
                                    <div className="input-field col s3 offset-s1">
                                        <input value={nombreP} id="nombrep" type="text" className="validate" onChange={(e) => setNombreP(e.target.value)} />
                                        <label htmlFor="nombrep">Nombre Producto</label>
                                    </div>
                                    <div className="input-field col s3">
                                        <input id="cantidap" value={cantidadP} type="number" className="validate" onChange={(e) => setCantidadP(e.target.value)} />
                                        <label htmlFor="cantidap">Cantisdad</label>
                                    </div>
                                    <a

                                        className="waves-effect waves-light black-text indigo darken-4 btn-small"

                                        onClick={agregarP}
                                    >
                                        <i className="material-icons white-text">
                                            add
                                        </i>
                                    </a>
                                </div>

                                <div className="row">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {dc.map((p, index) => {
                                                return (
                                                    <tr key={index} onClick={() => sacarA(index)}>
                                                        <td>{p.nombre}</td>
                                                        <td>{p.cantidad}</td>
                                                    </tr>
                                                );
                                            })}
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
                                {!me && (
                                        <div className="row">
                                            <div className="input-field col s3 offset-s1">
                                                <input id="nombrep" value={nombreP} type="text" className="validate" onChange={(e) => setNombreP(e.target.value)} />
                                                <label htmlFor="nombrep">Nombre Producto</label>
                                            </div>
                                            <div className="input-field col s3">
                                                <input id="cantidap" value={cantidadP} type="number" className="validate" onChange={(e) => setCantidadP(e.target.value)} />
                                                <label htmlFor="cantidap">Cantisdad</label>
                                            </div>
                                            <a

                                                className="waves-effect waves-light black-text indigo darken-4 btn-small"

                                                onClick={agregarP}
                                            >
                                                <i className="material-icons white-text">
                                                    add
                                                </i>
                                            </a>
                                        </div>
                                    )}
                                {me && (
                                        <div className="row">
                                            <div className="input-field col s3 offset-s1">
                                                <input id="nombrep" type="text" value={sn} className="validate" onChange={(e) => setsn(e.target.value)} />
                                                <label className="active" htmlFor="nombrep">Nombre Producto</label>
                                            </div>
                                            <div className="input-field col s3">
                                                <input value={sc} id="cantidap" type="number" className="validate" onChange={(e) => setsc(e.target.value)} />
                                                <label className="active" htmlFor="cantidap">Cantisdad</label>
                                            </div>
                                            <a

                                                className="waves-effect waves-light black-text indigo darken-4 btn-small"

                                                onClick={()=>modificarp(pr.id)}
                                            >
                                                <i className="material-icons white-text">
                                                mode_edit
                                                </i>
                                            </a>
                                            <a

                                                className="waves-effect waves-light black-text red darken-4 btn-small"

                                                onClick={()=>eliminarp(pr.id)}
                                            >
                                                <i className="material-icons white-text">
                                                delete_forever
                                                </i>
                                            </a>
                                            <a

                                                className="waves-effect waves-light black-text red darken-4 btn-small"

                                                onClick={desselect}
                                            >
                                                <i className="material-icons white-text">
                                                cancel_presentation
                                                </i>
                                            </a>
                                        </div>
                                    )}
                                
                                <div className="row">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {dc2.map((p) => {
                                                return (
                                                    <tr key={p.id} onClick={()=> seleccionar2(p)}>
                                                        <td>{p.name}</td>
                                                        <td>{p.cant}</td>
                                                    </tr>
                                                );
                                            })}
                                            {paeditar.map((p) => {
                                                return (
                                                    <tr className="orange" key={p.id} onClick={()=> seleccionar2(p)}>
                                                        <td>{p.name}</td>
                                                        <td>{p.cant}</td>
                                                    </tr>
                                                );
                                            })}
                                            {paeliminar.map((p) => {
                                                return (
                                                    <tr className="red" key={p.id} onClick={()=> seleccionar2(p)}>
                                                        <td>{p.name}</td>
                                                        <td>{p.cant}</td>
                                                    </tr>
                                                );
                                            })}
                                            {dc.map((p, index) => {
                                                return (
                                                    <tr className="green" key={index} onClick={() => sacarA(index)}>
                                                        <td>{p.nombre}</td>
                                                        <td>{p.cantidad}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
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
