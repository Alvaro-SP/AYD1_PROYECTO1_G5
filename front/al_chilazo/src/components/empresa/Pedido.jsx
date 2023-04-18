import "../../styles/Pedido_emp.css";
import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export default function Pedido() {
    const [listado, setListado] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [nombre, setNombre] = useState({})
    useEffect(() => {
        getData();
        M.AutoInit();

    }, []);
    const getData = async () => {
        var lis = [
            {
                id: 1,
                state: 1,
                date: '2/3/2023',
                total_price: 200,
                user_id: 2,
                address: '27 calle 4-12 z10',
                payment_method: 'efectivo',
                rate: 'No se que sea esto pero aquie sta',
                detalle: [{ id: 1, name: 'leche', cantidad: 2, precio: 10.2 }, { id: 2, name: 'leche', cantidad: 2, precio: 10.2 }, { id: 3, name: 'leche', cantidad: 2, precio: 10.2 }]
            }
        ]
        setPedidos(lis)
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
        setNombre(elemento)
        setListado(elemento.detalle);
    }

    const confirmar = async () => {
        const data = {
            idPedido: nombre.id
        };
        console.log('Confirmo pedido')
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
    const entregar = async () => {
        const data = {
            idPedido: nombre.id
        };
        console.log('Entregar')
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
    return (<>
        <div className="container">
            <h1>Pedidos</h1>
            <div className="row">
                <div className="col fondo">
                    <h5>Nuevos pedidos</h5>
                    <table className="centered highlight gray lighten-4">
                        <thead className="indigo darken-1 white-text">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Total</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pedidos.map((pedido) => {
                                return (
                                    <tr key={pedido.id}>
                                        <td>{pedido.id}</td>
                                        <td>{pedido.user_id}</td>
                                        <td>{pedido.total_price}</td>
                                        <td>
                                            <a href="#verDetalle" onClick={() => seleccionar(pedido)} className="modal-trigger btn-floating btn-small waves-effect black-text purple darken-4"><i className="material-icons">format_list_bulleted</i></a>
                                            <a href="#confirmacionModalP" onClick={() => seleccionar(pedido)} className="btn-floating btn-small waves-effect black-text green modal-trigger"><i className="material-icons">check</i></a>

                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <div className="col fondo">
                    <h5>En preparacion</h5>
                    <table className="centered highlight yellow lighten-4">
                        <thead className="orange">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Total</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pedidos.map((pedido) => {
                                return (
                                    <tr key={pedido.id}>
                                        <td>{pedido.id}</td>
                                        <td>{pedido.user_id}</td>
                                        <td>{pedido.total_price}</td>
                                        <td>
                                            <a href="#verDetalle" onClick={() => seleccionar(pedido)} className="modal-trigger btn-floating btn-small waves-effect black-text purple darken-4"><i className="material-icons">format_list_bulleted</i></a>
                                            <a href="#entregarPedidoE" onClick={() => seleccionar(pedido)} className="btn-floating btn-small waves-effect black-text green modal-trigger"><i className="material-icons">delivery_dining</i></a>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col fondo">
                    <h5>Espera de repartidor</h5>
                    <table className="centered highlight green lighten-4">
                        <thead className="green">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pedidos.map((pedido) => {
                                return (
                                    <tr key={pedido.id}>
                                        <td>{pedido.id}</td>
                                        <td>{pedido.user_id}</td>
                                        <td>{pedido.total_price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
            <div id="verDetalle" className="modal">
                <div className="modal-content">
                    <h3>Detalle pedido</h3>
                    <h5><b>Pedido NO.</b> {nombre.id}</h5>
                    <h6><b>Id Usuario:</b> {nombre.user_id}</h6>
                    <h6><b>Fecha:</b> {nombre.date}</h6>
                    <h6><b>Estado:</b> {nombre.state}</h6>
                    <h6><b>Direccion:</b> {nombre.address}</h6>
                    <h6><b>Metodo de pago:</b> {nombre.payment_method}</h6>
                    <h6><b>Rate:</b> {nombre.rate}</h6>
                    <div className="row">
                        <table className="centered highlight gray lighten-4">
                            <thead className="indigo darken-1 white-text">
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listado.map((detail) => {
                                    return (<tr key={detail.id}>
                                        <td>{detail.id}.</td>
                                        <td>{detail.name}</td>
                                        <td>{detail.precio}</td>
                                        <td>{detail.cantidad}</td>
                                        <td>{detail.precio * detail.cantidad}</td>
                                    </tr>);

                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
            <div id="confirmacionModalP" className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>Desee confirmar el pedido no. {nombre.id}?</h4>
                    <div>
                        <a className="btn-floating btn-large waves-effect black-text red darken-4 modal-close"><i className="material-icons">cancel</i></a>
                        <a onClick={confirmar} className="btn-floating btn-large waves-effect black-text green modal-close"><i className="material-icons">check</i></a>
                    </div>
                </div>
            </div>

            <div id="entregarPedidoE" className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>El pedido {nombre.id} ya esta preprado?</h4>
                    <div>
                        <a className="btn-floating btn-large waves-effect black-text red darken-4 modal-close"><i className="material-icons">cancel</i></a>
                        <a onClick={entregar} className="btn-floating btn-large waves-effect black-text green modal-close"><i className="material-icons">check</i></a>
                    </div>
                </div>
            </div>
        </div>
    </>);
}