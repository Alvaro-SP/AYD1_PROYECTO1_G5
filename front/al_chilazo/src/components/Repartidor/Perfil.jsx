import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import { departamentos, municipios } from "../../shared/ubicacion";
import axios from "axios";
import "../../styles/perfil_rep.css";

export function PerfilRepartidor() {
  const [dept, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [depState, setDepState] = useState(departamentos);
  const [munState, setMunState] = useState([]);

  useEffect(() => {
    var elems = document.getElementById("selDep");
    M.FormSelect.init(elems, {});

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
    });
  }, []);

  useEffect(() => {
    getMunAux();
  }, [dept]);

  useEffect(() => {
    var elem = document.getElementById("selMun");
    M.FormSelect.init(elem, {});
  }, [munState]);

  const getMunAux = async () => {
    const result = await municipios[dept];
    console.log(result);
    setMunState(result);
  };

  const changeZoneSol = async () => {
    var elem = document.getElementById("changeUbication");
    var instance = M.Modal.getInstance(elem);

    try {
      if (dept === "") {
        M.toast({
          html: "No Se Ha Seleccionado Un Departamento",
          classes: "white-text rounded orange darken-3",
        });

        return;
      }

      if (municipio === "") {
        M.toast({
          html: "No Se Ha Seleccionado Un Municipio",
          classes: "white-text rounded orange darken-3",
        });

        return;
      }

      const data = {
        depto: dept,
        municipio: municipio,
      };

      console.log(data);
      const result = (await axios.post(url + "change-zone", data)).data;
      console.log(result);

      if (result.res) {
        instance.close();

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
          <div className="row center-content borderRating">
            <div className="col s4 center-align yellow-text text-darken-3">
              <i className="material-icons iconSize">star</i>
              <i className="material-icons iconSize">star</i>
              <i className="material-icons iconSize">star_half</i>
              <i className="material-icons iconSize">star_border</i>
              <i className="material-icons iconSize">star_border</i>
            </div>
            <div className="col s1 center-content">
              <i className="material-icons medium yellow-text text-darken-3">trending_up</i>
            </div>
            <div className="col s5 center-align">
              <h4>Rating:&nbsp;9.5/10</h4>
            </div>
          </div>
          <br />
          <div className="row center-content borderComision">
            <div className="col s1 center-content">
              <i className="material-icons medium green-text text-darken-3">
                paid
              </i>
            </div>
            <div className="col s10 center-align">
              <h4>Comisiones Generadas:&nbsp;Q{"1937.00"}</h4>
            </div>
            <div className="col s1 center-content">
              <i className="material-icons medium green-text text-darken-3">
                paid
              </i>
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
      <div id="changeUbication" className="modal modal-fixed-footer">
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
                      id="selDep"
                      onChange={(e) => setDepartamento(e.target.value)}
                      defaultValue={""}
                    >
                      <option value={""} disabled>
                        SELECCIONE EL NUEVO DEPARTAMENTO
                      </option>
                      {depState.map((dep, index) => {
                        return (
                          <option value={dep} key={index}>
                            {dep}
                          </option>
                        );
                      })}
                    </select>
                    <label>DEPARTAMENTO</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">add_home_work</i>
                    <select
                      className="validate"
                      id="selMun"
                      onChange={(e) => setMunicipio(e.target.value)}
                      defaultChecked={""}
                    >
                      <option value={""} disabled>
                        SELECCIONE EL NUEVO MUNICIPIO
                      </option>
                      {munState.map((muni, index) => {
                        return (
                          <option value={muni} key={index}>
                            {muni}
                          </option>
                        );
                      })}
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
            className="waves-effect waves-green btn-flat"
            onClick={changeZoneSol}
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
