import axios from "axios";
import { useState } from "react";

export function RegistrarEmpresa() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [correo, setCorreo] = useState("");
  const [docAuth, setAuth] = useState(undefined);
  const [docReg, setReg] = useState(undefined);
  const [docRegSan, setRegSan] = useState(undefined);
  
  const sendRequest = async () => {
    // ! CONSTRUIR OBJETO DE DATA Y VALIDAR CAMPOS
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

    const data = {
      rol: "negocio",
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      correo: correo,
      docAuth: docAuth,
      docReg: docReg,
      docRegSan: docRegSan,
    };

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
          <div className="col s8 offset-s2">
            <div className="card-panel hoverable">
              <div className="card-content">
                <h3 className="orange-text text-darken-3 center-align">
                  Registrarse
                </h3>
                <div className="row">
                  <form className="col s10 offset-s1">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">business</i>
                        <input
                          id="nombre"
                          type="text"
                          className="validate"
                          onChange={(e) => setNombre(e.target.value)}
                        />
                        <label htmlFor="nombre">Nombre Empresa</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">description</i>
                        <textarea
                          id="descripcion"
                          className="materialize-textarea"
                          onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                        <label htmlFor="descripcion">Descripcion</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">category</i>
                        <input
                          id="categoria"
                          type="text"
                          className="validate"
                          onChange={(e) => setCategoria(e.target.value)}
                        />
                        <label htmlFor="categoria">Categoria</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">alternate_email</i>
                        <input
                          id="email"
                          type="text"
                          className="validate"
                          onChange={(e) => setCorreo(e.target.value)}
                        />
                        <label htmlFor="email">Correo</label>
                      </div>
                    </div>
                    <div className="row">
                      <h4 className="orange-text text-darken-3 center-align">
                        Documentos
                      </h4>
                    </div>
                    <div className="row">
                      <div className="file-field input-field">
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
                          Enviar Solicitud
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
