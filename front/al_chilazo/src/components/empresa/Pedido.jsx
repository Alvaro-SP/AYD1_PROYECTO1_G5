import "../../styles/Empresa/pedido_emp.css";
import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export default function Pedido() {
  const [listado, setListado] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [nombre, setNombre] = useState({});
  const [colorTitle, setColor] = useState("");
  const [iconModal, setIcon] = useState("")

  useEffect(() => {
    getData();
    M.AutoInit();
  }, []);
  const getData = async () => {
    var lis = [
      {
        id: 1,
        state: 1,
        date: "2/3/2023",
        total_price: 200,
        user_id: 2,
        address: "27 calle 4-12 z10",
        payment_method: "efectivo",
        rate: "No se que sea esto pero aquie sta",
        detalle: [
          { id: 1, name: "leche", cantidad: 2, precio: 10.2 },
          { id: 2, name: "leche", cantidad: 2, precio: 10.2 },
          { id: 3, name: "leche", cantidad: 2, precio: 10.2 },
        ],
      },
    ];
    setPedidos(lis);
    try {
            const result = (await axios.get(url + "pedidos-de-use-empresa")).data;
            

            if (result.res) {
              setPedidos(result.res);

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

  const seleccionar = async (elemento, color, icon) => {
    setNombre(elemento);
    setListado(elemento.detalle);
    setColor(color);
    setIcon(icon)
  };

  const confirmar = async () => {
    const data = {
      idPedido: nombre.id,
    };
    console.log("Confirmo pedido");
    console.log(data);

    try {
            const result = (await axios.post(url + "confirmar-pedido-empresa", data)).data;
            console.log(result);

            if (result.res) {

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
  const entregar = async () => {
    const data = {
      idPedido: nombre.id,
    };
    console.log("Entregar");
    console.log(data);

    try {
            const result = (await axios.post(url + "preparar-pedido-empresa", data)).data;
            console.log(result);

            if (result.res) {
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
        <h1 className="center-align">AREA DE PEDIDOS</h1>
        <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="fondo" style={{ flexGrow: "1" }}>
            <h5 className="center-align">Nuevos pedidos</h5>
            <table className="centered highlight gray lighten-4">
              <thead className="red darken-1 white-text">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>TOTAL</th>
                  <th>OPTIONS</th>
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
                        <a
                          href="#verDetalle"
                          onClick={() => seleccionar(pedido, "red", "start")}
                          className="modal-trigger btn-floating btn-small waves-effect black-text purple darken-4 tooltipped"
                          data-position="bottom"
                          data-tooltip="Ver Mas"
                        >
                          <i className="material-icons">format_list_bulleted</i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="fondo" style={{ flexGrow: "1" }}>
            <h5 className="center-align">Preparacion</h5>
            <table className="centered highlight yellow lighten-4">
              <thead className="orange white-text">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>TOTAL</th>
                  <th>OPTIONS</th>
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
                        <a
                          href="#verDetalle"
                          onClick={() => seleccionar(pedido, "orange", "delivery_dining")}
                          className="modal-trigger btn-floating btn-small waves-effect black-text purple darken-4 tooltipped"
                          data-position="bottom"
                          data-tooltip="Ver Mas"
                        >
                          <i className="material-icons">format_list_bulleted</i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="fondo" style={{ flexGrow: "1" }}>
            <h5 className="center-align">Esperando Repartidor</h5>
            <table className="centered highlight green lighten-4">
              <thead className="green white-text">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>TOTAL</th>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div id="verDetalle" className="modal">
          <div className="modal-content" style={{ paddingLeft: "30px" }}>
            <blockquote style={{ borderRight: "solid 5px #ee6e73" }}>
              <h3 className="center-align">DETALLE PEDIDO</h3>
            </blockquote>
            <h5 className="center-align">
              <b>Pedido NO.</b> {nombre.id}
            </h5>
            <h6>
              <b>Id Usuario:</b> {nombre.user_id}
            </h6>
            <h6>
              <b>Fecha:</b> {nombre.date}
            </h6>
            <h6>
              <b>Estado:</b> {nombre.state}
            </h6>
            <h6>
              <b>Direccion:</b> {nombre.address}
            </h6>
            <h6>
              <b>Metodo de pago:</b> {nombre.payment_method}
            </h6>
            <h6>
              <b>Rate:</b> {nombre.rate}
            </h6>
            <div className="row">
              <table className="centered highlight gray lighten-4">
                <thead className={colorTitle + " darken-1 white-text"}>
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
                    return (
                      <tr key={detail.id}>
                        <td>{detail.id}.</td>
                        <td>{detail.name}</td>
                        <td>{detail.precio}</td>
                        <td>{detail.cantidad}</td>
                        <td>{detail.precio * detail.cantidad}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row" style={{paddingTop: "25px"}}>
              <div className="col s6 offset-s4">
                <a
                  href="#confirmacionModalP"
                  onClick={() => seleccionar(nombre, colorTitle, iconModal)}
                  className="btn-large waves-effect white-text green modal-trigger"
                >
                  <i className="material-icons left iconSizeModalPedido">{iconModal}</i>
                  Siguiente Fase
                </a>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Aceptar
            </a>
          </div>
        </div>

        <div id="confirmacionModalP" className="modal bottom-sheet">
          <div className="modal-content">
            <div className="container">
              <div className="row marginRow">
                <div
                  className="col s8"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                >
                  <h4>Desea Confirmar El Pedido No. {nombre.id}?</h4>
                </div>
                <div className="col s1">
                  <a
                    onClick={confirmar}
                    data-position="top"
                    data-tooltip="Accept"
                    className="btn-floating btn-large waves-effect black-text green modal-close tooltipped"
                  >
                    <i className="material-icons iconSizeModalPedido">check</i>
                  </a>
                </div>
                <div className="col s1">
                  <a
                    className="btn-floating btn-large waves-effect black-text red darken-4 modal-close tooltipped"
                    data-position="top"
                    data-tooltip="Cancel"
                  >
                    <i className="material-icons iconSizeModalPedido">cancel</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="entregarPedidoE" className="modal bottom-sheet">
          <div className="modal-content">
            <div className="container">
              <div className="row marginRow">
                <div
                  className="col s6"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                >
                  <h4>El Pedido {nombre.id} Ya Esta Listo?</h4>
                </div>
                <div className="col s1">
                  <a
                    onClick={entregar}
                    data-position="top"
                    data-tooltip="Accept"
                    className="btn-floating btn-large waves-effect black-text green modal-close tooltipped"
                  >
                    <i className="material-icons iconSizeModalPedido">check</i>
                  </a>
                </div>
                <div className="col s1">
                  <a
                    className="btn-floating btn-large waves-effect black-text red darken-4 modal-close tooltipped"
                    data-position="top"
                    data-tooltip="Cancel"
                  >
                    <i className="material-icons iconSizeModalPedido">cancel</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
