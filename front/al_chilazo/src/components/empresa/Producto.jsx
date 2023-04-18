import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export default function Producto() {
    const [listaCategoria, setListaCategoria] = useState([]);
    const [listado, setListado] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0.00);
    const [empresa, setEmpresa] = useState(0);
    const [imagen, setImagen] = useState('');
    const [categoria, setCategoria] = useState(0);
    const [filtro, setFiltro] = useState(0);

    useEffect(() => {
        getData();
        getData2();
        M.AutoInit();

    }, []);
    const getData = async () => {
        var lis = [
            {
                id: 1,
                name: 'leche',
                price: 10.2,
                categoria: 1,
                nombreCategoria: 'Lacteo',
                imagen: 'https://lala.com.gt/wp-content/uploads/2019/04/0-colesterol-425-ml.png',
            },
            {
                id: 2,
                name: 'leche',
                price: 10.2,
                categoria: 2,
                nombreCategoria: 'Carne',
                imagen: 'https://lala.com.gt/wp-content/uploads/2019/04/0-colesterol-425-ml.png',
            },
            {
                id: 3,
                name: 'leche',
                price: 10.2,
                categoria: 3,
                nombreCategoria: 'Huevos',
                imagen: 'https://lala.com.gt/wp-content/uploads/2019/04/0-colesterol-425-ml.png',
            }
        ]
        setListado(lis)
        /*try {
            const result = (await axios.get(url + "getProductos")).data;
            console.log(result);

            if (result.res) {
                setListado(result.listado);

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
        }*/
    };
    const getData2 = async () => {
        /*try {
            const result = (await axios.get(url + "getProductos")).data;
            console.log(result);

            if (result.res) {
                setListado(result.listado);

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
        }*/
    };
    const seleccionar = async (elemento) => {
        setNombre(elemento.name);
        setPrecio(elemento.price);
        setImagen(elemento.imagen);
        setCategoria(elemento.categoria);
        console.log('Datos selecionados')
    }

    const eliminar = async () => {
        const data = {
            id: 1
        };
        console.log('para eliminar');

        /*try {
            const result = (await axios.post(url + "agregarProducto", data)).data;
            console.log(result);

            if (result.res) {
                let aux = listaUsers.filter((user) => user.nombre !== userModal);
                setListadoUsers(aux);

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
        }*/
    };

    const agregarProducto = async () => {
        const data = {
            name: nombre,
            price: precio,
            empresa_id: empresa,
            imagen: imagen,
            categoryProduct_id: categoria
        };
        console.log(data);

        /*try {
            const result = (await axios.post(url + "agregarProducto", data)).data;
            console.log(result);

            if (result.res) {
                let aux = listaUsers.filter((user) => user.nombre !== userModal);
                setListadoUsers(aux);

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
        }*/
    };

    const filtrar = () => {
        if(parseInt(filtro) ===0){
            return listado
        }
        return listado.filter((dato) => {
            return dato.categoria === parseInt(filtro)
        })
    }
    return (<>
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <h1>Productos</h1>
                    <a href="#modalAgregarProducto" className="btn-floating btn-large waves-effect waves-light indigo darken-1 modal-trigger"><i className="material-icons">queue</i></a>
                </div>

                <div className="col s6" style={{ paddingTop: 50 }}>

                    <div className="col">
                        <div className="row">
                            <div className="input-field inline">
                                <select onChange={(e) => setFiltro(e.target.value)} defaultValue={''}>
                                    <option value="0">Ninguno</option>
                                    <option value="1">Lacteo</option>
                                    <option value="2">Carne</option>
                                    <option value="3">Huevos</option>
                                </select>
                                <label>Buscar por categoria</label>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className="row">
                <table className="centered highlight grey lighten-4">
                    <thead className="indigo darken-1 white-text">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio</th>
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
                                    <td><img className="materialboxed" width="100" src="https://lala.com.gt/wp-content/uploads/2019/04/0-colesterol-425-ml.png" /></td>
                                    <td>{pelicula.price}</td>
                                    <td>{pelicula.categoria}</td>
                                    <td>
                                        <a href="#modalModificarProducto" className=" modal-trigger waves-effect waves-light black-text yellow btn-small"
                                            onClick={() => seleccionar(pelicula)}
                                        >Editar</a>
                                        <a className="waves-effect waves-light red btn-small" onClick={eliminar}>Eliminar</a>
                                    </td>
                                </tr>
                            )
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
                                    <input onChange={(e) => setNombre(e.target.value)}
                                        id="nombre" type="text" className="validate" />
                                    <label htmlFor="nombre">Nombre Producto</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input onChange={(e) => setPrecio(e.target.value)}
                                        id="precio" type="number" className="validate" />
                                    <label htmlFor="precio">Precio</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input onChange={(e) => setImagen(e.target.value)}
                                        id="imagen" type="text" className="validate" />
                                    <label htmlFor="imagen">Url imagen</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <select onChange={(e) => setCategoria(e.target.value)} defaultValue={''}>
                                        <option value="" disabled>Choose your option</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </select>
                                    <label>Selecionar Categoria</label>
                                </div>
                            </div>

                            <input onClick={agregarProducto}
                                className="modal-close waves-effect waves-light btn-small" value="Agregar" />
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>

            <div id="modalModificarProducto" className="modal">
                <div className="modal-content">
                    <h4>Modificar Producto</h4>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input value={nombre} onChange={(e) => setNombre(e.target.value)}
                                        id="nombrem" type="text" className="validate" />
                                    <label htmlFor="nombrem">Nombre Producto</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input value={precio} onChange={(e) => setPrecio(e.target.value)}
                                        id="preciom" type="number" className="validate" />
                                    <label htmlFor="preciom">Precio</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input value={imagen} onChange={(e) => setImagen(e.target.value)}
                                        id="imagenm" type="text" className="validate" />
                                    <label htmlFor="imagenm">Url imagen</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <select onChange={(e) => setCategoria(e.target.value)} defaultValue={''}>
                                        <option value="" disabled>Choose your option</option>
                                        <option value="1">Lacteo</option>
                                        <option value="2">Carne</option>
                                        <option value="3">Huevos</option>
                                    </select>
                                    <label>Selecionar Categoria</label>
                                </div>
                            </div>
                            
                            <button onClick={agregarProducto}
                                className="modal-close waves-effect waves-light btn-small">Modificar</button>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>

        </div>
    </>);
}