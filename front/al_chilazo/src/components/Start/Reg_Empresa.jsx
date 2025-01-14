import axios from "axios";
import { url } from "../../shared/url";
import { departamentos, municipios } from "../../shared/ubicacion";
import { useEffect, useState } from "react";

export function RegistrarEmpresa() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [correo, setCorreo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [docAuth, setAuth] = useState(undefined);
  const [docReg, setReg] = useState(undefined);
  const [docRegSan, setRegSan] = useState(undefined);
  const [password, setPassword] = useState("");
  const [depState, setDepState] = useState(departamentos);
  const [munState, setMunState] = useState([]);

  useEffect(() => {
    var elems = document.getElementById("selDepEmp");
    M.FormSelect.init(elems, {});
  }, []);

  useEffect(() => {
    getMunAux();
  }, [departamento]);

  useEffect(() => {
    var elem = document.getElementById("selMunEmp");
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

    if (descripcion === "") {
      M.toast({
        html: "Descripcion Invalida",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (categoria === "") {
      M.toast({
        html: "Categoria Invalida",
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

    if (departamento === "" || municipio === "") {
      M.toast({
        html: "La Ubicacion Es Incorrecta",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (docAuth === undefined) {
      M.toast({
        html: "Documento de Autenticacion Invalido",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (docReg === undefined) {
      M.toast({
        html: "Documento De Registro Invalido",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    if (docRegSan === undefined) {
      M.toast({
        html: "Documento De Registro Sanitario Invalido",
        classes: "white-text rounded orange darken-4",
      });

      return;
    }

    const data = new FormData();
    data.append("rol", "3");
    data.append("name", nombre);
    data.append("description", descripcion);
    data.append("category", categoria);
    data.append("mail", correo);
    data.append("depto", departamento);
    data.append("municipio", municipio);
    data.append("password", password);
    data.append("docAuth", docAuth);
    data.append("docReg", docReg);
    data.append("docRegSan", docRegSan);

    try {
      console.log(data);
      const result = (await axios.post(url + "register", data)).data;
      console.log(result);

      if (result.res) {
        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-3",
        });
      } else {
        M.toast({
          html: result.message,
          classes: "white-text rounded orange darken-3",
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
                <h3 className="orange-text text-darken-3 center-align">
                  REGISTRARSE
                </h3>
                <div className="row">
                  <form className="col s10 offset-s1">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">business</i>
                        <input
                          id="nameRegEmpresa"
                          type="text"
                          className="validate"
                          onChange={(e) => setNombre(e.target.value)}
                        />
                        <label htmlFor="nameRegEmpresa">
                          NOMBRE DE LA EMPRESA
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">description</i>
                        <textarea
                          id="descRegEmpresa"
                          className="materialize-textarea"
                          onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                        <label htmlFor="descRegEmpresa">DESCRIPCION</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">category</i>
                        <select
                          id="selectCatEmpresa"
                          className="validate"
                          onChange={(e) => setCategoria(e.target.value)}
                        >
                          <option defaultValue={""} disabled>
                            SELECCIONE LA CATEGORIA DE LA EMPRESA
                          </option>
                          <option value="1">Restaurante y Comida Rápida</option>
                          <option value="2">Cafetería</option>
                          <option value="3">Tienda de conveniencia</option>
                          <option value="4">Supermercado</option>
                        </select>
                        <label htmlFor="selectCatEmpresa">CATEGORIA</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">alternate_email</i>
                        <input
                          id="emailRegEmpresa"
                          type="text"
                          onChange={(e) => setCorreo(e.target.value)}
                        />
                        <label htmlFor="emailRegEmpresa">CORREO</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">password</i>
                        <input
                          id="passRegEmpresa"
                          type="password"
                          className="validate"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="passRegEmpresa">PASSWORD</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">home_work</i>
                        <select
                          className="validate"
                          id="selDepEmp"
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
                        <label htmlFor="selDepEmp">DEPARTAMENTO</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">add_home_work</i>
                        <select
                          className="validate"
                          id="selMunEmp"
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
                        <label htmlFor="selMunEmp">MUNICIPIO</label>
                      </div>
                    </div>
                    <div className="row">
                      <h4 className="orange-text text-darken-3 center-align">
                        DOCUMENTOS
                      </h4>
                    </div>
                    <div className="row">
                      <div class="file-field input-field">
                        <div className="btn orange darken-3">
                          <span>Autenticidad</span>
                          <input
                            type="file"
                            onChange={(e) => setAuth(e.target.files[0])}
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input type="text" className="file-path validate" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="file-field input-field">
                        <div className="btn orange darken-3">
                          <span>Registro Mer.</span>
                          <input
                            type="file"
                            onChange={(e) => setReg(e.target.files[0])}
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input type="text" className="file-path validate" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="file-field input-field">
                        <div className="btn orange darken-3">
                          <span>Reg.Sanitario</span>
                          <input
                            type="file"
                            onChange={(e) => setRegSan(e.target.files[0])}
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input type="text" className="file-path validate" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s8 offset-s3">
                        <a
                          href="#!"
                          className="waves-effect waves-light btn-large orange darken-3"
                          onClick={sendRequest}
                        >
                          <i className="material-icons left">
                            send_time_extension
                          </i>
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
