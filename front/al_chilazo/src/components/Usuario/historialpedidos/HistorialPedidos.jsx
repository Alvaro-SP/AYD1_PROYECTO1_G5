import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';
import axios from "axios";

function HistorialPedidos() {

  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchDta = async () => {
      const response = await axios.post(url + "historial-pedidos-user",user.id);
      setOrders(response.data.res);
      console.log("se reciben ordenes: ",response.data.res)
    };

    fetchDta();
    
    // Inicializa el componente de colapsables de Materialize
    M.AutoInit();
  }, []);
   //recibir el arreglo de pedidos de endpoint 
  


  return (
    <div className="container">
      <h2 className="red-text">Historial de pedidos</h2>
      <ul className="collapsible">
        {orders.map((order) => (
          <li key={order.id}>
            <div className="collapsible-header red white-text">
              <i className="material-icons">assignment</i>
              Pedido #{order.id}
            </div>
            <div className="collapsible-body">
              <ul>
                  <li key={1}>Estado: {order.state}</li>
                  <li key={2}>Fecha: {order.date}</li>
                  <li key={4}>direccion: {order.address}</li>
                  <li key={5}>metodo de pago: {order.payment_method}</li>
                  <li key={6}>rate: {order.rate}</li>
                  <li key={7}>nombre repartidor: {order.name_repartidor}</li>
                  <li key={8}>nombre empresa: {order.name_empresa}</li>
              </ul>
              <p className="red-text">Total: {order.total_price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorialPedidos;
