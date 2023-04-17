import { useEffect } from "react";
import { url } from "../../shared/url";
import axios from "axios";
import "../../styles/perfil_rep.css";

export function PerfilRepartidor() {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});

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
              <h2 className="green-text text-darken-2 center-align">
                MI PERFIL
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <br />
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">person</i>
                  <input
                    type="text"
                    id="nombrePerfilRep"
                    className="validate active"
                    /* value={} */
                  />
                  <label htmlFor="nombrePerfilRep">NOMBRE</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">person</i>
                  <input
                    type="text"
                    id="apellidoPerfilRep"
                    className="validate active"
                    /* value={solicitud.apellido} */
                  />
                  <label htmlFor="apellidoPerfilRep">APELLIDO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">markunread</i>
                  <input
                    type="email"
                    id="emailPerfilRep"
                    className="validate active"
                    /* value={solicitud.correo} */
                  />
                  <label htmlFor="emailPerfilRep">CORREO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">smartphone</i>
                  <input
                    type="tel"
                    id="telefonoPerfilRep"
                    className="validate active"
                    /* value={solicitud.telefono} */
                  />
                  <label htmlFor="telefonoPerfilRep">NO. CELULAR</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">map</i>
                  <input
                    type="text"
                    id="depPerfilRep"
                    className="validate active"
                    /* value={solicitud.departamento} */
                  />
                  <label htmlFor="depPerfilRep">DEPARTAMENTO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">place</i>
                  <input
                    type="text"
                    id="munPerfilRep"
                    className="validate active"
                    /* value={solicitud.municipio} */
                  />
                  <label htmlFor="munPerfilRep">MUNICIPIO</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s2 offset-s5">
                  <label>
                    <input
                      name="perfilRep"
                      type="radio"
                      /* checked={solicitud.licencia} */
                    />
                    <span className="black-text">LICENCIA</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">badge</i>
                  <input
                    type="text"
                    id="licensePerfilRep"
                    className="validate active"
                    /* value={solicitud.tipoLicencia} */
                  />
                  <label htmlFor="licensePerfilRep">TIPO LICENCIA</label>
                </div>
              </div>
              <div className="row">
                <div className="col s10 offset-s4">
                  <a
                    className="btn green darken-3 white-text modal-trigger"
                    href="#changeUbication"
                  >
                    <i className="material-icons left">change_circle</i>
                    SOLICITUD PARA CAMBIAR UBICACION
                  </a>
                </div>
              </div>
            </form>
          </div>
          <br />
          <br />
        </div>
      </section>
      <div id="changeUbication" className="modal">
        <div className="modal-content">
          <div className="container">
            <div className="row">
              <div className="col s12 center-align">
                <h5 className="red-text text-darken-3">
                  SOLICITUD PARA CAMBIAR UBICACION
                </h5>
                <div className="divider"></div>
              </div>
            </div>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">home_work</i>
                    <select
                      className="validate"
                      /* onChange={(e) => setDepartamento(e.target.value)} */
                    >
                      <option defaultValue={""} disabled>
                        SELECCIONE EL NUEVO DEPARTAMENTO
                      </option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                    <label>DEPARTAMENTO</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">add_home_work</i>
                    <select
                      className="validate"
                      /* onChange={(e) => setMunicipio(e.target.value)} */
                    >
                      <option defaultValue={""} disabled>
                        SELECCIONE EL NUEVO MUNICIPIO
                      </option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                    <label>MUNICIPIO</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            /* onClick={enviarSolicitud} */
          >
            ENVIAR
          </a>
          <a href="#!" className="modal-close waves-effect waves-red btn-flat">
            CANCELAR
          </a>
        </div>
      </div>
    </>
  );
}
