import React, { useEffect, useRef, useState} from 'react';
import { url } from "../../../shared/url";
import M from 'materialize-css';
import axios from "axios";

function HistorialPedidos() {

  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchDta = async () => {
      const data = {
        id: user.id
      };
      const response = await axios.post(url + "reportef3",data);
      console.log(response.data.res)
      setOrders(response.data.res);
      console.log("se reciben ordenes: ",response.data.res)
    };

    fetchDta();
    
    // Inicializa el componente de colapsables de Materialize
    M.AutoInit();
  }, []);
   //recibir el arreglo de pedidos de endpoint 
  


  return (
    <section>
      <div className="container">
      <h2 className="red-text center-align">Historial de pedidos</h2>
      <ul className="collapsible">
        {orders.map((order) => (
          <li key={order.id}>
            <div className="collapsible-header red white-text">
              <i className="material-icons">assignment</i>
              Pedido #{order.id}
            </div>
            <div className="collapsible-body">
                <div className="row">
                  <div className="col s6">
                    <h5><b>Estado:</b> {order.state}</h5>
                  </div>
                  <div className="col s6">
                    <h5><b>Fecha:</b>{order.date}</h5>
                  </div>
                </div>
                <div className="row">
                <div className="col s6">
                  <h5><b>Direccion:</b> {order.address}</h5>
                  </div>
                  <div className="col s6">
                  <h5><b>Metodo De Pago:</b> {order.payment_method}</h5>
                  </div>
                </div>
                <div className="row">
                <div className="col s6">
                <h5><b>rate:</b> {order.rate}</h5>
                  </div>
                  <div className="col s6">
                  <h5><b>nombre repartidor:</b> {order.name_user}</h5>
                  </div>
                </div>
                <div className="row">
                <div className="col s6">
                <h5><b>nombre empresa:</b> {order.mail_user}</h5>
                </div>
                <div className="col s6">
                <h5 className='red-text'><b>Total:</b>{order.total_price}</h5> 
                </div>
                </div>
              {/* <ul>
                  <li key={1}>Estado: {order.state}</li>
                  <li key={2}>Fecha: {order.date}</li>
                  <li key={4}>direccion: {order.address}</li>
                  <li key={5}>metodo de pago: {order.payment_method}</li>
                  <li key={6}>rate: {order.rate}</li>
                  <li key={7}>nombre repartidor: {order.name_repartidor}</li>
                  <li key={8}>nombre empresa: {order.name_empresa}</li>
              </ul> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </section>
  );
}

export default HistorialPedidos;
