import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { url } from "../../shared/url";
import { auth } from "../../shared/auth";
import axios from "axios";
import "../../styles/Administrador/solicitud_rep.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

export function SolicitudRepartidor() {
  const [listaSolicitudes, setSolicitudes] = useState([]);
  const [listaRegistrados, setRegistros] = useState([]);
  /* const [pdfFile, setPDFFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(false); */

  useEffect(() => {
    getData();

    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 250,
      outDuration: 250,
    });

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.9,
    });
  }, []);

  const getData = async () => {
    try {
      const result = (await axios.get(url + "solicitudes-repartidor", auth))
        .data;

      if (result.res) {
        setSolicitudes(result.res.filter(repartidor => repartidor.approved === 0));
        setRegistros(result.res.filter(repartidor => repartidor.approved === 1));
        
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

  const confirmarSolicitud = async (id, state) => {
    const data = {
      id: id,
      state: state,
    };

    try {
      const result = (await axios.post(url + "confirmar-repartidor", data, auth))
        .data;
      console.log(result);

      if (result.res) {
        if (state === 1) {
          const aux2 = listaRegistrados;
          aux2.push(listaSolicitudes.find(solicitud => solicitud.id === id));

          const aux = listaSolicitudes.filter(solicitud => solicitud.id !== id);

          setSolicitudes(aux);
          setRegistros(aux2);

        } else {
          const aux = listaSolicitudes.filter(solicitud => solicitud.id !== id);
          setSolicitudes(aux);
        }

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

  const getLicencia = (license) => {
    if (license === 0) {
      return "NO TIENE LICENCIA";
    } else if (license === 1) {
      return "LICENCIA TIPO A";
    } else if (license === 2) {
      return "LICENCIA TIPO B";
    } else if (license === 3) {
      return "LICENSIA TIPO C";
    } else if (license === 4) {
      return "LICENCIA TIPO M";
    } else if (license === 5) {
      return "LICENCIA TIPO E";
    }
  };

  const getOwnTrans = (own) => {
    if (own === "0") {
      return "NO TIENE TRANSPORTE PROPIO";
    } else if (own === "1") {
      return "SI TIENE TRANSPORTE PROPIO";
    }
  };

  /* const fileType = ["application/pdf"];
  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFFile(e.target.result);
          setViewPDF(true);
        };
      } else {
        setPDFFile(null);
      }
    }
  }; */

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
                {listaSolicitudes.map((solicitud, index) => {
                  let own = getOwnTrans(solicitud.own_transport);
                  let license = getLicencia(solicitud.license);
                  return (
                    <li key={index}>
                      <div className="collapsible-header">
                        <div className="col s12 valign-wrapper">
                          <i className="material-icons">work_outline</i>
                          {solicitud.name + " " + solicitud.lastname}
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
                                  disabled={true}
                                  className="validate black-text"
                                  value={solicitud.name}
                                />
                                <label htmlFor="nombreSol" className="active">
                                  Nombre
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">person</i>
                                <input
                                  type="text"
                                  id="apellidoSol"
                                  disabled={true}
                                  className="validate black-text"
                                  value={solicitud.lastname}
                                />
                                <label htmlFor="apellidoSol" className="active">
                                  Apellido
                                </label>
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
                                  disabled={true}
                                  className="validate black-text"
                                  value={solicitud.mail}
                                />
                                <label htmlFor="emailSol" className="active">
                                  Correo
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  smartphone
                                </i>
                                <input
                                  type="tel"
                                  id="telefonoSol"
                                  disabled={true}
                                  className="validate black-text"
                                  value={solicitud.phone}
                                />
                                <label htmlFor="telefonoSol" className="active">
                                  No. Celular
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">map</i>
                                <input
                                  type="text"
                                  id="depaSol"
                                  disabled={true}
                                  className="validate black-text"
                                  value={solicitud.depto}
                                />
                                <label htmlFor="depaSol" className="active">
                                  Departamento
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">place</i>
                                <input
                                  type="text"
                                  id="munSol"
                                  disabled={true}
                                  className="validate black-text"
                                  value={solicitud.city}
                                />
                                <label htmlFor="munSol" className="active">
                                  Municipio
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">badge</i>
                                <input
                                  type="text"
                                  id="licensiaSol"
                                  disabled={true}
                                  className="validate black-text"
                                  value={license}
                                />
                                <label htmlFor="licenciaSol" className="active">
                                  Tipo Licencia
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  directions_car
                                </i>
                                <input
                                  type="text"
                                  id="ownTransSol"
                                  disabled={true}
                                  className="validate black-text"
                                  value={own}
                                />
                                <label htmlFor="ownTransSol" className="active">
                                  Transporte Propio
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4 offset-s4">
                                <a
                                  className="btn indigo darken-3 white-text waves-effect waves-light modal-trigger"
                                  href="#viewPDF"
                                  /* // ! <!-- AL CLICKEAR SETEAR AL DOCUMENTO EN EL MODAL --> */
                                >
                                  <i className="material-icons left">
                                    plagiarism
                                  </i>
                                  VER CURRICULUM
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4 offset-s2">
                                <a
                                  className="btn green darken-3 white-text"
                                  onClick={() =>
                                    confirmarSolicitud(solicitud.id, 1)
                                  }
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
                                    confirmarSolicitud(solicitud.id, 2)
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
                {listaRegistrados.map((registro, index) => {
                  let own = getOwnTrans(registro.own_transport);
                  let license = getLicencia(registro.license);
                  return (
                    <li key={index}>
                      <div className="collapsible-header">
                        <i className="material-icons">work</i>
                        {registro.name + " " + registro.lastname}
                      </div>
                      <div className="collapsible-body">
                        <div className="row">
                          <form className="col s12">
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">person</i>
                                <input
                                  type="text"
                                  id="nombreSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={registro.name}
                                />
                                <label
                                  htmlFor="nombreSolReg"
                                  className="active"
                                >
                                  Nombre
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">person</i>
                                <input
                                  type="text"
                                  id="apellidoSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={registro.lastname}
                                />
                                <label
                                  htmlFor="apellidoSolReg"
                                  className="active"
                                >
                                  Apellido
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  markunread
                                </i>
                                <input
                                  type="email"
                                  id="emailSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={registro.mail}
                                />
                                <label htmlFor="emailSolReg" className="active">
                                  Correo
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  smartphone
                                </i>
                                <input
                                  type="tel"
                                  id="telefonoSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={registro.phone}
                                />
                                <label
                                  htmlFor="telefonoSolReg"
                                  className="active"
                                >
                                  No. Celular
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">map</i>
                                <input
                                  type="text"
                                  id="depaSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={registro.depto}
                                />
                                <label htmlFor="depaSolReg" className="active">
                                  Departamento
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">place</i>
                                <input
                                  type="text"
                                  id="munSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={registro.city}
                                />
                                <label htmlFor="munSolReg" className="active">
                                  Municipio
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6">
                                <i className="material-icons prefix">badge</i>
                                <input
                                  type="text"
                                  id="licensiaSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={license}
                                />
                                <label
                                  htmlFor="licenciaSolReg"
                                  className="active"
                                >
                                  Tipo Licencia
                                </label>
                              </div>
                              <div className="input-field col s6">
                                <i className="material-icons prefix">
                                  directions_car
                                </i>
                                <input
                                  type="text"
                                  id="ownTransSolReg"
                                  disabled={true}
                                  className="validate black-text"
                                  value={own}
                                />
                                <label
                                  htmlFor="ownTransSolReg"
                                  className="active"
                                >
                                  Transporte Propio
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s4 offset-s4">
                                <a className="btn indigo darken-3 white-text waves-effect waves-light">
                                  <i className="material-icons left">
                                    plagiarism
                                  </i>
                                  VER CURRICULUM
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
      <br />
      <br />
      {/* <div className="modal" id="viewPDF">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewPDF && <Viewer fileUrl={pdfFile} />}

          {!viewPDF && <>NO PDF</>}
        </Worker>
      </div> */}
    </div>
  );
}
