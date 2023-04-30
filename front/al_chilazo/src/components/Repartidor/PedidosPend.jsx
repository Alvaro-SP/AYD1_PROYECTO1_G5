import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import { auth } from "../../shared/auth";
import axios from "axios";
import "../../styles/Repartidor/pedidos_pend.css";

export function PedidosPendientes() {
  const [listaPedidos, setListaPedidos] = useState([])
  const [id, setID] = useState("")
  const [date, setDate] = useState("")
  const [total, setTotal] = useState("")
  const [address, setAddress] = useState("")
  const [payment, setPayment] = useState("")

  useEffect(() => {
    getPedidosPendientes();

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
    });
  }, []);

  const getPedidosPendientes = async () => {
    const data = {
      id: JSON.parse(localStorage.getItem("user")).id
    }

    try {
      const result = (await axios.post(url + "pedidosaentregar-repartidor", data, auth)).data
      console.log(result.res)
      if(result.res) {
        setListaPedidos(result.res)
        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4"
        })
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4"
      })
    }
  }

  const confirmarPedido = async () => {
    const data = {
      idPedido: parseInt(id),
      idRepartidor: JSON.parse(localStorage.getItem("user")).id
    }
    
    try {
      const result = (await axios.post(url + "selectpedido-repartidor", data, auth)).data

      if(result.res) {
        let newListaPedidos = listaPedidos.filter(pedido => pedido.id !== id)
        setListaPedidos(newListaPedidos)

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4"
        })
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded red darken-4"
        })
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4"
      })
    }
  }

  const setearDatosModal = (pedido) => {
    setID(pedido.id)
    setDate(pedido.date)
    setTotal(pedido.total_price)
    setAddress(pedido.address)
    setPayment(pedido.payment_method)
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="green-text text-darken-3 center-align">
                PEDIDOS PENDIENTES
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            {
              listaPedidos.map((pedido, index) => {
                return (
                  <div className="col s6" key={index}>
                    <div className="card horizontal deep-orange lighten-3 hoverable">
                      <div className="card-stacked">
                        <div className="card-content">
                          <p>
                            ID Pedido: {pedido.id} <br />
                            <br />
                            Direccion Entrega: {pedido.address} <br />
                            <br />
                            Total: Q{pedido.total_price}
                          </p>
                        </div>
                        <div className="card-action center-content deep-orange">
                          <a
                            href="#detallePedido"
                            className="white-text modal-trigger"
                            onClick={() => setearDatosModal(pedido)}
                          >
                            <i className="material-icons left">visibility</i>
                            VER MAS
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      <div className="modal" id="detallePedido">
        <div className="modal-content">
          <h4>DETALLE DEL PEDIDO</h4>
          <div className="row">
            <div className="col s6">
              <p>
                ID Pedido: {id} <br />
                <br />
                Total: Q{total} <br />
                <br />
                Tipo De Pago: {payment}
              </p>
            </div>
            <div className="col s6">
              <p>
                Direccion: {address} <br />
                <br />
                Fecha: {date} <br />
              </p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={confirmarPedido}>
            <i className="material-icons left green-text text-darken-3">done</i>
            ACEPTAR
          </a>
          <a href="#!" className="modal-close waves-effect waves-red btn-flat">
            <i className="material-icons left red-text text-darken-3">close</i>
            CERRAR
          </a>
        </div>
      </div>
    </>
  );
}
