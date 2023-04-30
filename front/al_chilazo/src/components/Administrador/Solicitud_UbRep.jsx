import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import { auth } from "../../shared/auth";
import { sendEmail } from "../../proc/email";
import axios from "axios";
import "../../styles/Administrador/cambio_ubicacion.css";

export function SolicitudCambiarUbicacion() {
  const [listaSolicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    getData();

    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {
      inDuration: 200,
      outDuration: 200,
    });
  }, []);

  const getData = async () => {
    try {
      const result = (await axios.get(url + "solicitudes-ubicacion-rep", auth))
        .data;
      console.log(result);

      if (result.res) {
        setSolicitudes(result.res);

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

    if (state === 0) {
      asunto = "Solicitud De Cambio De Ubicacion";
      mensaje = `Se Ha Aprobado El Cambio
      De Ubicacion Que Ha Solicitado.
      
      Atentamente, Administracion`;
    } else {
      asunto = "Solicitud De Cambio De Ubicacion";
      mensaje = `Se Ha Rechazado El Cambio
      De Ubicacion Que Ha Solicitado.
      
      Atentamente, Administracion`;
    }

    try {
      const result = (
        await axios.post(url + "confirmar-ub-nueva-rep", data, auth)
      ).data;

      if (result.res) {
        let aux = listaSolicitudes.filter((sol) => sol.id !== id);
        setSolicitudes(aux);
        sendEmail(email, asunto, mensaje)
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

  return (
    <section>
      <div className="container" style={{ overflowY: "hidden" }}>
        <div className="row">
          <div className="col s12">
            <h2 className="deep-orange-text text-darken-2 center-align">
              Cambio De Ubicacion Repartidor
            </h2>
            <div className="divider"></div>
          </div>
        </div>
        <div className="row">
          {listaSolicitudes.map((solicitud, index) => {
            return (
              <div class="card hoverable col s8 offset-s2">
                <div class="card-content">
                  <span class="card-title activator arrow_animation center">
                    {solicitud.name + " " + solicitud.lastname}
                    <i class="material-icons right arrow_animation">
                      more_vert
                    </i>
                  </span>
                  <div className="divider"></div>
                  <br />
                  <div className="row">
                    <div className="col s5 center">
                      <p>
                        <b>DEPTO: </b> {solicitud.deptoActual} <br />
                        <b>CITY:</b> {solicitud.cityActual}
                      </p>
                    </div>
                    <div className="col s1 center-content">
                      <i className="material-icons iconSize arrow_animation">
                        double_arrow
                      </i>
                    </div>
                    <div className="col s5 center">
                      <p>
                        <b>DEPTO: </b> {solicitud.deptoNew} <br />
                        <b>CITY: </b> {solicitud.cityNew}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-reveal">
                  <div className="row">
                    <h6 class="card-title grey-text text-darken-4">
                      Cambiar Ubicacion
                      <i class="material-icons right arrow_animation">close</i>
                    </h6>
                    <div className="divider line_animation"></div>
                    <div className="divider line_animation"></div>
                    <div className="divider line_animation"></div>
                    <div className="divider line_animation"></div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col s2 offset-s3">
                        <a
                          class="btn-floating waves-effect waves-light green darken-4 tooltipped"
                          data-position="bottom"
                          data-tooltip="Accept"
                          onClick={() =>
                            confirmarSolicitud(solicitud.id, 0, solicitud.mail)
                          }
                        >
                          <i class="material-icons white-text">gpp_good</i>
                        </a>
                      </div>
                      <div className="col s2 offset-s1">
                        <a
                          class="btn-floating waves-effect waves-light red darken-4 tooltipped"
                          data-position="bottom"
                          data-tooltip="Denied"
                          onClick={() =>
                            confirmarSolicitud(solicitud.id, 1, solicitud.mail)
                          }
                        >
                          <i class="material-icons white-text">highlight_off</i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
