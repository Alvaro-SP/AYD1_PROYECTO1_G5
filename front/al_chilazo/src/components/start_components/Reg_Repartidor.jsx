import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export function RegistrarRepartidor() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [licencia, setLicencia] = useState(false);
  const [tipoLicencia, setTipoLicencia] = useState("");
  const [curriculum, setCurriculum] = useState(undefined);

  //? ESCONDER EL SELECT DE LICENCIA
  const [esconder, setEsconder] = useState("hide");

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  }, []);

  useEffect(() => {
    if (licencia) {
      setEsconder("");
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, {});
    } else {
      setEsconder("hide");
    }
  }, [licencia]);

  const sendRequest = async () => {
    if (nombre === "") {
      M.toast({
        html: "Nombre Invalido",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (apellido === "") {
      M.toast({
        html: "Apellidos Invalidos",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (correo === "") {
      M.toast({
        html: "Correo Invalido",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (celular === "") {
      M.toast({
        html: "Numero De Celular Invalido",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (departamento === "" || municipio === "") {
      M.toast({
        html: "La Ubicacion Es Incorrecta",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (licencia) {
      if (tipoLicencia === "") {
        M.toast({
          html: "No Se Ha Seleccionado Un Tipo De Licensia",
          classes: "white-text rounded orange darken-4",
        });

        return;
      }
    }

    if (curriculum === undefined) {
      M.toast({
        html: "No Se Ha Cargado El Curriculum Vitae",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    const data = {
      rol: "repartidor",
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      celular: celular,
      departamento: departamento,
      municipio: municipio,
      licencia: licencia,
      tipoLicencia: tipoLicencia,
      curriculum: curriculum,
    };

    try {
      console.log(data);
      const result = (await axios.post(url + "register")).data;
      console.log(result);

      if (result.res) {
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
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="card-panel hoverable">
              <div className="card-content">
                <h3 className="indigo-text text-darken-3 center-align">
                  Registrarse
                </h3>
                <div className="row">
                  <form className="col s10 offset-s1">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">person</i>
                        <input
                          id="nombre"
                          type="text"
                          className="validate"
                          onChange={(e) => setNombre(e.target.value)}
                        />
                        <label htmlFor="nombre">Nombre</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">person</i>
                        <input
                          id="apellido"
                          type="text"
                          className="validate"
                          onChange={(e) => setApellido(e.target.value)}
                        />
                        <label htmlFor="apellido">Apellido</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">markunread</i>
                        <input
                          id="email"
                          type="email"
                          className="validate"
                          onChange={(e) => setCorreo(e.target.value)}
                        />
                        <label htmlFor="email">Correo</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">smartphone</i>
                        <input
                          id="telefono"
                          type="tel"
                          className="validate"
                          onChange={(e) => setCelular(e.target.value)}
                        />
                        <label htmlFor="telefono">No. Celular</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">home_work</i>
                        <select
                          className="validate"
                          onChange={(e) => setDepartamento(e.target.value)}
                        >
                          <option defaultValue={""} disabled selected>
                            Seleccione Su Departamento
                          </option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                        <label>Departamento</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">add_home_work</i>
                        <select
                          className="validate"
                          onChange={(e) => setMunicipio(e.target.value)}
                        >
                          <option defaultValue={""} disabled selected>
                            Seleccione El Municipio
                          </option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                        <label>Municipio</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s4 offset-s4">
                        <p>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => setLicencia(!licencia)}
                            />
                            <span>Posee Licencia</span>
                          </label>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className={"input-field col s12 " + esconder}>
                        <i className="material-icons prefix">badge</i>
                        <select
                          className="validate"
                          onChange={(e) => setTipoLicencia(e.target.value)}
                        >
                          <option defaultValue={""} disabled selected>
                            Seleccione Un Tipo De Licencia
                          </option>
                          <option value="A">TIPO A</option>
                          <option value="B">TIPO B</option>
                          <option value="C">TIPO C</option>
                          <option value="M">TIPO M</option>
                          <option value="E">TIPO E</option>
                        </select>
                        <label>Tipo Licencia</label>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="file-field input-field">
                        <div className="btn indigo darken-3">
                          <span>Cargar CV</span>
                          <input
                            type="file"
                            onChange={(e) => setCurriculum(e.target.files[0])}
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input type="text" className="file-path validate" />
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="row">
                      <div className="col s9 offset-s3">
                        <a
                          href="#!"
                          className="waves-effect waves-light btn-large indigo darken-3"
                          onClick={sendRequest}
                        >
                          <i className="material-icons left">local_shipping</i>
                          Registrar Solicitud
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
