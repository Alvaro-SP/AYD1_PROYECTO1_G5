import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";
import "../../styles/solicitud_rep.css";

export function SolicitudRepartidor() {
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
      const result = (await axios.get(url + "solicitudesRep")).data;
      console.log(result);

      if (result.res) {
        setSolicitudes(result.solicitudes);
        setRegistros(result.registros);

        M.toast({
          html: "La respuesta fue satisfactoria",
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

  const aceptarSolicitud = async (idSolicitud) => {
    const data = {
      idSolicitud: idSolicitud,
    };

    try {
      const result = (await axios.post(url + "addRepartidor", data)).data;
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
                {listaSolicitudes.map((solicitud) => {
                  return (
                    <li>
                      <div className="collapsible-header">
                        <div className="col s10 valign-wrapper">
                          <i className="material-icons">work_outline</i>
                          {solicitud.nombre + " " + solicitud.apellido}
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
                                  className="validate active"
                                  value={solicitud.nombre}
                                />
                                <label htmlFor="nombreSol">Nombre</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">person</i>
                                <input
                                  type="text"
                                  id="apellidoSol"
                                  className="validate active"
                                  value={solicitud.apellido}
                                />
                                <label htmlFor="apellidoSol">Apellido</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  markunread
                                </i>
                                <input
                                  type="email"
                                  id="emailSol"
                                  className="validate active"
                                  value={solicitud.correo}
                                />
                                <label htmlFor="emailSol">Correo</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  smartphone
                                </i>
                                <input
                                  type="tel"
                                  id="telefonoSol"
                                  className="validate active"
                                  value={solicitud.telefono}
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
                                  className="validate active"
                                  value={solicitud.departamento}
                                />
                                <label htmlFor="depaSol">Departamento</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">place</i>
                                <input
                                  type="text"
                                  id="munSol"
                                  className="validate active"
                                  value={solicitud.municipio}
                                />
                                <label htmlFor="munSol">Municipio</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s4 offset-s2">
                                <p>
                                  <label>
                                    <input
                                      name="sol1"
                                      type="radio"
                                      checked={solicitud.licencia}
                                    />
                                    <span>Licencia</span>
                                  </label>
                                </p>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">badge</i>
                                <input
                                  type="text"
                                  id="licensiaSol"
                                  className="validate active"
                                  value={solicitud.tipoLicencia}
                                />
                                <label htmlFor="licenciaSol">
                                  Tipo Licencia
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4 offset-s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">
                                    plagiarism
                                  </i>
                                  {/* //? AGREGAR OPCION DE VER DOCUMENTO */}
                                  VER CURRICULUM
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
                {listaRegistrados.map((registro) => {
                  return (
                    <li>
                      <div className="collapsible-header">
                        <i className="material-icons">work</i>
                        {registro.nombre + " " + registro.apellido}
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
                                  className="validate active"
                                  value={registro.nombre}
                                />
                                <label htmlFor="nombreSol">Nombre</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">person</i>
                                <input
                                  type="text"
                                  id="apellidoSol"
                                  className="validate active"
                                  value={registro.apellido}
                                />
                                <label htmlFor="apellidoSol">Apellido</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  markunread
                                </i>
                                <input
                                  type="email"
                                  id="emailSol"
                                  className="validate active"
                                  value={registro.correo}
                                />
                                <label htmlFor="emailSol">Correo</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  smartphone
                                </i>
                                <input
                                  type="tel"
                                  id="telefonoSol"
                                  className="validate active"
                                  value={registro.telefono}
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
                                  className="validate active"
                                  value={registro.departamento}
                                />
                                <label htmlFor="depaSol">Departamento</label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">place</i>
                                <input
                                  type="text"
                                  id="munSol"
                                  className="validate active"
                                  value={registro.municipio}
                                />
                                <label htmlFor="munSol">Municipio</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s4 offset-s2">
                                <p>
                                  <label>
                                    <input
                                      name="reg1"
                                      type="radio"
                                      checked={registro.licencia}
                                    />
                                    <span>Licencia</span>
                                  </label>
                                </p>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">badge</i>
                                <input
                                  type="text"
                                  id="licensiaSol"
                                  className="validate active"
                                  value={registro.tipoLicencia}
                                />
                                <label htmlFor="licenciaSol">
                                  Tipo Licensia
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4 offset-s4">
                                <div className="btn indigo darken-3 white-text">
                                  <i className="material-icons left">
                                    plagiarism
                                  </i>
                                  VER CURRICULUM
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
    </div>
  );
}
