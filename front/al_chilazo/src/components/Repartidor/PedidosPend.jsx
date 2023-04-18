import { useEffect } from "react";
import "../../styles/pedidos_pend.css";

export function PedidosPendientes() {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
    });
  }, []);

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
            <div className="col s6">
              <div className="card horizontal deep-orange lighten-3 hoverable">
                <div className="card-stacked">
                  <div className="card-content">
                    <p>
                      Nombre: Cliente 1 <br />
                      <br />
                      Direccion Entrega: XXXXXXXXXXXXXX <br />
                      <br />
                      Pedido: XXXXXXXXXXXXXXX
                    </p>
                  </div>
                  <div className="card-action center-content deep-orange">
                    <a
                      href="#detallePedido"
                      className="white-text modal-trigger"
                    >
                      <i className="material-icons left">visibility</i>
                      VER MAS
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s6">
              <div className="card horizontal deep-orange lighten-3 hoverable">
                <div className="card-stacked">
                  <div className="card-content">
                    <p>
                      Nombre: Cliente 1 <br />
                      <br />
                      Direccion Entrega: XXXXXXXXXXXXXX <br />
                      <br />
                      Pedido: XXXXXXXXXXXXXXX
                    </p>
                  </div>
                  <div className="card-action center-content deep-orange">
                    <a
                      href="#detallePedido"
                      className="black-text modal-trigger"
                    >
                      <i className="material-icons left">visibility</i>
                      VER MAS
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal" id="detallePedido">
        <div className="modal-content">
          <h4>DETALLE DEL PEDIDO</h4>
          Detalle Del Pedido Para Ser Aceptado
        </div>
        <div className="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">
            <i className="material-icons left green-text text-darken-3">done</i>
            ACEPTAR
          </a>
          <a href="#!" class="modal-close waves-effect waves-red btn-flat">
            <i className="material-icons left red-text text-darken-3">close</i>
            CERRAR
          </a>
        </div>
      </div>
    </>
  );
}
