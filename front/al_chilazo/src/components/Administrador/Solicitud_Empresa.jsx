import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import { auth } from "../../shared/auth";
import { sendEmail } from "../../proc/email";
import axios from "axios";
import "../../styles/Administrador/solicitud_rep.css";

export function SolicitudEmpresa() {
  const [listaSolicitudes, setSolicitudes] = useState([]);
  const [listaRegistrados, setRegistros] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  useEffect(() => {
    getData();

    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 250,
      outDuration: 250,
    });
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, []);
  const setPdf = (pdf) => {
    setPdfData(pdf);
  };
  const getData = async () => {
    try {
      const result = (await axios.get(url + "solicitudes-empresa", auth)).data;
      console.log(result);

      if (result.res) {
        let lista1 = result.res.filter((negocio) => negocio.approved === 0);
        let lista2 = result.res.filter((negocio) => negocio.approved === 1);

        setSolicitudes(lista1);
        setRegistros(lista2);
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

  const confirmarSolicitud = async (id, state, email) => {
    let asunto = "";
    let mensaje = "";

    const data = {
      id: id,
      state: state,
    };

    if (state === 1) {
      asunto = "Solicitud Aceptacion";
      mensaje = `Se Ha Aprobado Su Solicitud
      Para Formar Parte Del Equipo De \"Al Chilazo\".
      
      Atentamente, Administracion`;
    } else {
      asunto = "Solicitud Aceptacion";
      mensaje = `Se Ha Rechazado Su Solicitud
      Para Formar Parte Del Equipo De \"Al Chilazo\".
      
      Atentamente, Administracion`;
    }

    try {
      const result = (await axios.post(url + "confirmar-empresa", data, auth))
        .data;
      console.log(result);

      if (result.res) {
        if (state === 1) {
          /* const aux2 = listaRegistrados;

          aux2.push(
            listaSolicitudes.filter((solicitud) => solicitud.id === id)
          );

          const aux = listaSolicitudes.filter(
            (solicitud) => solicitud.id !== id
          );

          setSolicitudes(aux);
          setRegistros(aux2); */
          getData()
        } else {
          const aux = listaSolicitudes.filter(
            (solicitud) => solicitud.id !== id
          );
          setSolicitudes(aux);
        }

        sendEmail(email, asunto, mensaje);

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

  const getCategory = (cat) => {
    if (cat === 1) {
      return "Restaurantes y Comida Rapida";
    } else if (cat === 2) {
      return "Cafeterias";
    } else if (cat === 3) {
      return "Tiendas de Conveniencia";
    } else if (cat === 4) {
      return "Supermercados";
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="teal-text text-darken-3 center-align">
                Solicitudes Negocios
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col s12">
              <ul className="collapsible popout">
                {listaSolicitudes.map((solicitud) => {
                  let category = getCategory(solicitud.category);
                  return (
                    <li>
                      <div className="collapsible-header">
                        <div className="col s12 valign-wrapper">
                          <i className="material-icons">storefront</i>
                          {solicitud.name}
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
                                  className="validate black-text"
                                  disabled={true}
                                  value={solicitud.name}
                                />
                                <label htmlFor="nombre" className="active">
                                  Nombre Empresa
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  description
                                </i>
                                <textarea
                                  id="descripcion"
                                  className="materialize-textarea"
                                  disabled={true}
                                  value={solicitud.description}
                                ></textarea>
                                <label htmlFor="descripcion" className="active">
                                  Descripcion
                                </label>
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
                                  className="validate black-text"
                                  disabled={true}
                                  value={category}
                                />
                                <label htmlFor="categoria" className="active">
                                  Categoria
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  alternate_email
                                </i>
                                <input
                                  id="email"
                                  type="text"
                                  className="validate black-text"
                                  disabled={true}
                                  value={solicitud.mail}
                                />
                                <label htmlFor="email" className="active">
                                  Correo
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4">
                                <a
                                  className="btn indigo darken-3 white-text waves-effect waves-light modal-trigger"
                                  href="#conf-delete-buisness"
                                  onClick={() => {
                                    setPdfData(solicitud.docauth);
                                  }}
                                >
                                  <i className="material-icons left">
                                    fingerprint
                                  </i>
                                  AUTENTICIDAD LEGAL&nbsp;
                                </a>
                              </div>
                              <div className="col s4">
                                <a
                                  className="btn indigo darken-3 white-text waves-effect waves-light modal-trigger"
                                  href="#conf-delete-buisness"
                                  onClick={() => {
                                    setPdf(solicitud.docreg);
                                  }}
                                >
                                  <i className="material-icons left">gavel</i>
                                  REGISTRO MERCANTIL
                                </a>
                              </div>
                              <div className="col s4">
                                <a
                                  className="btn indigo darken-3 white-text waves-effect waves-light modal-trigger"
                                  href="#conf-delete-buisness"
                                  onClick={() => {
                                    setPdf(solicitud.docregsan);
                                  }}
                                >
                                  <i className="material-icons left">
                                    sanitizer
                                  </i>
                                  REGISTRO SANITARIO
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4 offset-s2">
                                <a
                                  className="btn green darken-3 white-text"
                                  onClick={() => {
                                    confirmarSolicitud(
                                      solicitud.id,
                                      1,
                                      solicitud.mail
                                    );
                                  }}
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
                                    confirmarSolicitud(
                                      solicitud.id,
                                      2,
                                      solicitud.mail
                                    )
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
                  let category = getCategory(registro.category);
                  return (
                    <li>
                      <div className="collapsible-header">
                        <div className="col s12 valign-wrapper">
                          <i className="material-icons">storefront</i>
                          {registro.name}
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
                                  className="validate black-text black-text"
                                  disabled={true}
                                  value={registro.name}
                                />
                                <label htmlFor="nombre" className="active">
                                  Nombre Empresa
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  description
                                </i>
                                <textarea
                                  id="descripcion"
                                  className="materialize-textarea black-text validate"
                                  disabled={true}
                                  value={registro.description}
                                ></textarea>
                                <label htmlFor="descripcion" className="active">
                                  Descripcion
                                </label>
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
                                  className="validate black-text"
                                  disabled={true}
                                  value={category}
                                />
                                <label htmlFor="categoria" className="active">
                                  Categoria
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  alternate_email
                                </i>
                                <input
                                  id="email"
                                  type="text"
                                  className="validate black-text"
                                  disabled={true}
                                  value={registro.mail}
                                />
                                <label htmlFor="email" className="active">
                                  Correo
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4">
                                <a
                                  className="btn indigo darken-3 white-text waves-effect waves-light modal-trigger"
                                  href="#conf-delete-buisness"
                                  onClick={() => {
                                    setPdfData(registro.docauth);
                                  }}
                                >
                                  <i className="material-icons left">
                                    fingerprint
                                  </i>
                                  AUTENTICIDAD LEGAL&nbsp;
                                </a>
                              </div>
                              <div className="col s4">
                                <a
                                  className="btn indigo darken-3 white-text waves-effect waves-light modal-trigger"
                                  href="#conf-delete-buisness"
                                  onClick={() => {
                                    setPdfData(registro.docreg);
                                  }}
                                >
                                  <i className="material-icons left">gavel</i>
                                  REGISTRO MERCANTIL
                                </a>
                              </div>
                              <div className="col s4">
                                <a
                                  className="btn indigo darken-3 white-text waves-effect waves-light modal-trigger"
                                  href="#conf-delete-buisness"
                                  onClick={() => {
                                    setPdfData(registro.docregsan);
                                  }}
                                >
                                  <i className="material-icons left">
                                    sanitizer
                                  </i>
                                  REGISTRO SANITARIO
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
              <div></div>
              );
            </div>
          </div>
        </div>
      </section>
      <div className="modal" id="conf-delete-buisness">
        <div className="modal-content">
          <div className="divider"></div>
          <embed
            src={`data:application/pdf;base64,${pdfData}`}
            width="100%"
            height="400"
          />
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}
