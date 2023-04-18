import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";
import "../../styles/solicitud_rep.css";

export function SolicitudEmpresa() {
  const [listaSolicitudes, setSolicitudes] = useState([]);
  const [listaRegistrados, setRegistros] = useState([]);

  useEffect(() => {
    getData();

    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 250,
      outDuration: 250,
    });
  }, []);

  const getData = async () => {
    try {
      const result = (await axios.get(url + "solicitudesNegocios")).data;
      console.log(result);

      if (result.res) {
        setSolicitudes(result.solicitudes);
        setRegistros(result.registros);

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

  const aceptarSolicitud = async () => {
    const data = {
      idSolicitud: idSolicitud,
    };

    try {
      const result = (await axios.post(url + "addNegocio", data)).data;
      console.log(result);

      if (result.res) {
        const aux = listaSolicitudes.filter(
          (solicitud) => solicitud.id !== idSolicitud
        );
        setSolicitudes(aux);

        const aux2 = listaRegistrados;
        aux2.push(
          listaSolicitudes.filter((solicitud) => solicitud.id === idSolicitud)
        );
        setRegistros(aux2);

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

  const rechazarSolicitud = (id) => {
    const aux = listaSolicitudes.filter((solicitud) => solicitud.id !== id);
    setSolicitudes(aux);
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col 12 offset-s1">
              <h2 className="teal-text text-darken-3 center-align">
                Solicitudes De Negocios
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col s12">
              <ul className="collapsible popout">
                {listaSolicitudes.map((solicitud) => {
                  return (
                    <li>
                      <div className="collapsible-header">
                        <div className="col s10 valign-wrapper">
                          <i className="material-icons">storefront</i>
                          {solicitud.nombre}
                        </div>
                        <div className="col s2 center-content">
                          <span class="new badge green darken-3">4</span>
                        </div>
                      </div>
                      <div className="collapsible-body">
                        <div className="row">
                          <form className="col s12">
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  business
                                </i>
                                <input
                                  id="nombre"
                                  type="text"
                                  className="validate"
                                  value={solicitud.nombre}
                                />
                                <label htmlFor="nombre">Nombre Empresa</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  description
                                </i>
                                <textarea
                                  id="descripcion"
                                  className="materialize-textarea"
                                  value={solicitud.descripcion}
                                ></textarea>
                                <label htmlFor="descripcion">Descripcion</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  category
                                </i>
                                <input
                                  id="categoria"
                                  type="text"
                                  className="validate"
                                  value={solicitud.categoria}
                                />
                                <label htmlFor="categoria">Categoria</label>
                              </div>
                              <div className="input field col s6">
                                <i className="material-icons prefix">
                                  alternate_email
                                </i>
                                <input
                                  id="email"
                                  type="text"
                                  className="validate"
                                  value={solicitud.correo}
                                />
                                <label htmlFor="email">Correo</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">
                                    fingerprint
                                  </i>
                                  AUTENTICIDAD
                                </div>
                              </div>
                              <div className="col s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">gavel</i>
                                  REGISTRO MERCANTIL
                                </div>
                              </div>
                              <div className="col s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">
                                    sanitizer
                                  </i>
                                  REGISTRO SANITARIO
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4 offset-s2">
                                <a
                                  className="btn green darken-3 white-text"
                                  onClick={() => aceptarSolicitud(solicitud.id)}
                                >
                                  <i className="material-icons left">
                                    verified
                                  </i>
                                  ACEPTAR SOLICITUD
                                </a>
                              </div>
                              <div className="col s4">
                                <a
                                  className="btn red darken-3 white-text"
                                  onClick={() =>
                                    rechazarSolicitud(solicitud.id)
                                  }
                                >
                                  <i className="material-icons left">
                                    highlight_off
                                  </i>
                                  RECHAZAR SOLICITUD
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                  );
                })}
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
                Negocios Registrados
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ul className="collapsible expandable">
                {listaRegistrados.map((registro) => {
                  return (
                    <li>
                      <div className="collapsible-header">
                        <div className="col s10 valign-wrapper">
                          <i className="material-icons">storefront</i>
                          {registro.nombre}
                        </div>
                        <div className="col s2 center-content">
                          <span class="new badge green darken-3">4</span>
                        </div>
                      </div>
                      <div className="collapsible-body">
                        <div className="row">
                          <form className="col s12">
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  business
                                </i>
                                <input
                                  id="nombre"
                                  type="text"
                                  className="validate"
                                  value={registro.nombre}
                                />
                                <label htmlFor="nombre">Nombre Empresa</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  description
                                </i>
                                <textarea
                                  id="descripcion"
                                  className="materialize-textarea"
                                  value={registro.descripcion}
                                ></textarea>
                                <label htmlFor="descripcion">Descripcion</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  category
                                </i>
                                <input
                                  id="categoria"
                                  type="text"
                                  className="validate"
                                  value={registro.categoria}
                                />
                                <label htmlFor="categoria">Categoria</label>
                              </div>
                              <div className="input field col s6">
                                <i className="material-icons prefix">
                                  alternate_email
                                </i>
                                <input
                                  id="email"
                                  type="text"
                                  className="validate"
                                  value={registro.correo}
                                />
                                <label htmlFor="email">Correo</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">
                                    fingerprint
                                  </i>
                                  AUTENTICIDAD
                                </div>
                              </div>
                              <div className="col s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">gavel</i>
                                  REGISTRO MERCANTIL
                                </div>
                              </div>
                              <div className="col s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">
                                    sanitizer
                                  </i>
                                  REGISTRO SANITARIO
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
    </>
  );
}
