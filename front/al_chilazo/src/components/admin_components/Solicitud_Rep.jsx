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
    <div>
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
                    <div className="row">
                      <form className="col s12">
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">person</i>
                            <input
                              type="text"
                              id="nombreSol"
                              className="validate"
                            />
                            <label htmlFor="nombreSol">Nombre</label>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">person</i>
                            <input
                              type="text"
                              id="apellidoSol"
                              className="validate"
                            />
                            <label htmlFor="apellidoSol">Apellido</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">markunread</i>
                            <input
                              type="email"
                              id="emailSol"
                              className="validate"
                            />
                            <label htmlFor="emailSol">Correo</label>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">smartphone</i>
                            <input
                              type="tel"
                              id="telefonoSol"
                              className="validate"
                            />
                            <label htmlFor="telefonoSol">No. Celular</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">map</i>
                            <input
                              type="text"
                              id="depaSol"
                              className="validate"
                            />
                            <label htmlFor="depaSol">Departamento</label>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">place</i>
                            <input
                              type="text"
                              id="munSol"
                              className="validate"
                            />
                            <label htmlFor="munSol">Municipio</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s4 offset-s2">
                            <p>
                              <label>
                                <input type="checkbox" />
                                <span>Posee Licencia</span>
                              </label>
                            </p>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">badge</i>
                            <input
                              type="text"
                              id="licensiaSol"
                              className="validate"
                            />
                            <label htmlFor="licenciaSol">Tipo Licensia</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s4 offset-s4">
                            <div className="btn indigo darken-3 white-text">
                              <i className="material-icons left">plagiarism</i>
                              VER CURRICULUM
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s4 offset-s2">
                            <div className="btn green darken-3 white-text">
                              <i className="material-icons left">verified</i>
                              ACEPTAR SOLICITUD
                            </div>
                          </div>
                          <div className="col s4">
                            <div className="btn red darken-3 white-text">
                              <i className="material-icons left">
                                highlight_off
                              </i>
                              RECHAZAR SOLICITUD
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
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
                    <div className="row">
                      <form className="col s12">
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">person</i>
                            <input
                              type="text"
                              id="nombreSol"
                              className="validate"
                            />
                            <label htmlFor="nombreSol">Nombre</label>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">person</i>
                            <input
                              type="text"
                              id="apellidoSol"
                              className="validate"
                            />
                            <label htmlFor="apellidoSol">Apellido</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">markunread</i>
                            <input
                              type="email"
                              id="emailSol"
                              className="validate"
                            />
                            <label htmlFor="emailSol">Correo</label>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">smartphone</i>
                            <input
                              type="tel"
                              id="telefonoSol"
                              className="validate"
                            />
                            <label htmlFor="telefonoSol">No. Celular</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">map</i>
                            <input
                              type="text"
                              id="depaSol"
                              className="validate"
                            />
                            <label htmlFor="depaSol">Departamento</label>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">place</i>
                            <input
                              type="text"
                              id="munSol"
                              className="validate"
                            />
                            <label htmlFor="munSol">Municipio</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s4 offset-s2">
                            <p>
                              <label>
                                <input type="checkbox" />
                                <span>Posee Licencia</span>
                              </label>
                            </p>
                          </div>
                          <div className="input-field col s6">
                            <i className="material-icons prefix">badge</i>
                            <input
                              type="text"
                              id="licensiaSol"
                              className="validate"
                            />
                            <label htmlFor="licenciaSol">Tipo Licensia</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s4 offset-s4">
                            <div className="btn indigo darken-3 white-text">
                              <i className="material-icons left">plagiarism</i>
                              VER CURRICULUM
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
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
