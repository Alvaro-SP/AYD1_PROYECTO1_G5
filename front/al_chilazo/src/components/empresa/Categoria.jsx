import React, { useState, useEffect } from "react";
import { url } from "../../shared/url";
import axios from "axios";
export default function Categoria() {
    const [listado, setListado] = useState([]);
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        getData();
        M.AutoInit();
    }, []);

    const getData = async () => {
        var data ={
            id: 1 /*Se debe cambiar por el de sesion empresa */
        }
        try {
            const result = (await axios.post(url + "categoriasproducto-empresa",data)).data;
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

    const agregar = async () => {
        const data = {
            id: 1,
            name: nombre
        };
        console.log(data);

        try {
            const result = (await axios.post(url + "addcategoriaproducto", data)).data;
            console.log(result);

            if (result.res) {
                getData();

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
    return (<>
        <div className="container">
            <div className="row">
                <div className="col s6"><h1>Categorias</h1> </div>
                <div className="col s6" style={{ paddingTop: 50 }}>
                    <a href="#modalCategoria" className="btn-floating btn-large waves-effect waves-light indigo darken-1 modal-trigger"><i className="material-icons">add</i></a>

                </div>
            </div>
            <div className="row">
                <table className="centered highlight grey lighten-4">
                    <thead className="indigo darken-1 white-text">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listado.map((cate) => {
                            return (
                                <tr key={cate.id}>
                                    <td>{cate.id}</td>
                                    <td>{cate.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            <div id="modalCategoria" className="modal">
                <div className="modal-content">
                    <h4>Agregar categoria</h4>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">post_add</i>
                                    <input id="icon_prefix" type="text" onChange={(e) => setNombre(e.target.value)} className="validate" />
                                    <label htmlFor="icon_prefix">Nombre categoria</label>
                                </div>
                            </div>
                            <a className="waves-effect waves-light btn-small" onClick={agregar}>Agregar</a>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
                </div>
            </div>
        </div>
    </>);
}