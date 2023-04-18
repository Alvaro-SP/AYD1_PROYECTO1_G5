import { useEffect } from "react";
import "../../styles/pedido_asig.css";

export function PedidosAsignados() {
  useEffect(() => {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 250,
      outDuration: 250,
    });
  });

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="green-text text-darken-3 center-align">
                PEDIDOS ASIGNADOS
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row heightRow">
            <div className="card horizontal hoverable">
              <div className="card-image width-img">
                <img
                  src="https://fulfillment.shiprocket.in/wp-content/uploads/2023/03/nextDayDeliveryBanner-min.png"
                  alt=""
                  width={"225px"}
                  height={"250px"}
                />
              </div>
              <div className="card-stacked">
                <div class="card-content">
                  <div className="col s6">
                    <p className="ped_text">
                      Receptor: xxxxxxxxxx <br />
                      <br />
                      Departamento: xxxxxxxxxxxx <br />
                      <br />
                      Direccion: xxxxxxxxxxxx
                    </p>
                  </div>
                  <div className="col s6">
                    <p className="ped_text">
                      Telefono: xxxxxxxxxx <br />
                      <br />
                      Municipio: xxxxxxxxxxx <br />
                      <br />
                      Forma De Pago: xxxxxxxxxxxxxxx
                    </p>
                  </div>
                </div>
                <div class="card-action center-content">
                  <a
                    href="#"
                    className="green-text text-darken-3 center-content"
                  >
                    <i className="material-icons left">done_all</i>COMPLETO
                  </a>
                  <a href="#" className="red-text text-darken-3 center-content">
                    INCOMPLETO
                    <i className="material-icons right">highlight_off</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <h4 className="green-text text-darken-3 center-align">
              PEDIDOS COMPLETADOS
            </h4>
            <div className="divider"></div>
            <br />
            <div className="container">
              <ul className="collapsible popout">
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">all_inbox</i>PEDIDO: ID PEDIDO
                  </div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="col s6">
                        <p>
                          Receptor: xxxxxxxxxx <br />
                          <br />
                          Departamento: xxxxxxxxxxxx <br />
                          <br />
                          Direccion: xxxxxxxxxxxx <br />
                          <br />
                          Estado: XXXXXXXXXXX
                        </p>
                      </div>
                      <div className="col s6">
                        <p>
                          Telefono: xxxxxxxxxx <br />
                          <br />
                          Municipio: xxxxxxxxxxx <br />
                          <br />
                          Forma De Pago: xxxxxxxxxxxxxxx <br />
                          <br />
                          Calificacion: XXXXXXX
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
