import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import { departamentos, municipios } from "../../shared/ubicacion";
import axios from "axios";

export function RegistrarRepartidor() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [celular, setCelular] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [licencia, setLicencia] = useState(false);
  const [tipoLicencia, setTipoLicencia] = useState("0");
  const [ownCar, setownCar] = useState(false);
  const [curriculum, setCurriculum] = useState(undefined);
  const [depState, setDepState] = useState(departamentos);
  const [munState, setMunState] = useState([]);

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

  useEffect(() => {
    getMunAux();
  }, [departamento]);

  useEffect(() => {
    var elem = document.getElementById("selMunRep");
    M.FormSelect.init(elem, {});
  }, [munState]);

  const getMunAux = async () => {
    const result = await municipios[departamento];
    console.log(result);
    setMunState(result);
  };

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

    if (password === "") {
      M.toast({
        html: "Password Invalido",
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
    // Create an object of formData
    const data = new FormData();
    data.append("rol", "2");
    data.append("name", nombre);
    data.append("lastname", apellido);
    data.append("mail", correo);
    data.append("password", password);
    data.append("phone", celular);
    data.append("depto", departamento);
    data.append("city", municipio);
    data.append("license", tipoLicencia);
    data.append("own_transport", ownCar.toString());
    data.append("cv", curriculum);
    // const data = {
    //   rol: "2",
    //   name: nombre,
    //   lastname: apellido,
    //   mail: correo,
    //   password: password,
    //   phone: celular,
    //   depto: departamento,
    //   city: municipio,
    //   license: tipoLicencia,
    //   own_transport: ownCar.toString(),
    //   cv: curriculum,
    // };

    try {
      console.log(data);
      const result = (await axios.post(url + "register", data)).data;
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
          <div className="col s10 offset-s1">
            <div className="card-panel hoverable">
              <div className="card-content">
                <h3 className="indigo-text text-darken-3 center-align">
                  REGISTRARSE
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
                        <label htmlFor="nombre">NOMBRE</label>
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
                        <label htmlFor="apellido">APELLIDO</label>
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
                        <label htmlFor="email">CORREO</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">password</i>
                        <input
                          id="password"
                          type="password"
                          className="validate"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">PASSWORD</label>
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
                        <label htmlFor="telefono">NO. DE CELULAR</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">home_work</i>
                        <select
                          className="validate"
                          id="selDepRep"
                          onChange={(e) => setDepartamento(e.target.value)}
                          defaultValue={""}
                        >
                          <option value={""} disabled>
                            SELECCIONE SU DEPARTAMENTO
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
                          id="selMunRep"
                          onChange={(e) => setMunicipio(e.target.value)}
                          defaultChecked={""}
                        >
                          <option value={""} disabled>
                            SELECCIONE SU MUNICIPIO
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
                    <div className="row">
                      <div className="col s4 offset-s4">
                        <p>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => setownCar(!ownCar)}
                            />
                            <span className="black-text">AUTO PROPIO</span>
                          </label>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s5  offset-s4">
                        <p>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => setLicencia(!licencia)}
                            />
                            <span className="black-text">POSEE LICENCIA</span>
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
                          defaultValue={""}
                        >
                          <option value={""} disabled>
                            SELECCIONE EL TIPO DE LICENCIA
                          </option>
                          <option value="1">TIPO A</option>
                          <option value="2">TIPO B</option>
                          <option value="3">TIPO C</option>
                          <option value="4">TIPO M</option>
                          <option value="5">TIPO E</option>
                        </select>
                        <label>TIPO LICENCIA</label>
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
                          REGISTRAR SOLICITUD
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
