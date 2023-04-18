import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';

function HistorialPedidos({ orders }) {

  useEffect(() => {
    // Inicializa el componente de colapsables de Materialize
    M.AutoInit();
  }, []);

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
                {order.items.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
              <p className="red-text">Total: {order.total}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorialPedidos;
