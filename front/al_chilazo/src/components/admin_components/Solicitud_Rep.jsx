import { useEffect } from "react";
import "../../styles/solicitud_rep.css";

export function SolicitudRepartidor() {
  useEffect(() => {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 250,
      outDuration: 250,
    });
  }, []);

  return (
    <div className="fondoDiv">
      <section>
        <div className="container">
          <div className="row">
            <div className="col 12 offset-s1">
              <h2 className="teal-text text-darken-3 center-align">
                Solicitudes De Repartidores
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col s12">
              <ul className="collapsible popout">
                <li>
                  <div className="collapsible-header">
                    <div className="col s10 valign-wrapper">
                      <i className="material-icons">work_outline</i>
                      Nombre 1
                    </div>
                    <div className="col s2 center-content">
                      <span className="new badge green darken-3">4</span>
                    </div>
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
                <li>
                  <div className="collapsible-header">
                    <div className="col s10 valign-wrapper">
                      <i className="material-icons">work_outline</i>
                      Nombre 2
                    </div>
                    <div className="col s2 center-content">
                      <span className="new badge orange darken-3">4</span>
                    </div>
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
                <li>
                  <div className="collapsible-header">
                    <div className="col s10 valign-wrapper">
                      <i className="material-icons">work_outline</i>
                      Nombre 3
                    </div>
                    <div className="col s2 center-content">
                      <span className="new badge red darken-2">4</span>
                    </div>
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
                <li>
                  <div className="collapsible-header">
                    <div className="col s10 valign-wrapper">
                      <i className="material-icons">work_outline</i>
                      Nombre 4
                    </div>
                    <div className="col s2 center-content">
                      <span className="new badge red darken-3">4</span>
                    </div>
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <br />
      <div className="divider ldivider"></div>
      <br />
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="teal-text text-darken-3 center-align">
                Repartidores Registrados
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ul className="collapsible expandable">
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">work</i>
                    Nombre 1
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">work</i>
                    Nombre 2
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">work</i>
                    Nombre 3
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">work</i>
                    Nombre 4
                  </div>
                  <div className="collapsible-body">
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vitae, provident voluptates magnam tempora itaque
                      asperiores. Animi enim quam et reprehenderit aperiam ipsam
                      eos, voluptatibus, architecto alias iste delectus quos
                      dolores!
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
    </div>
  );
}
