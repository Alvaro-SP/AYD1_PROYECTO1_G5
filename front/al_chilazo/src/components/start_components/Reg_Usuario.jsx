import { useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export function RegistrarUsuario() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [correo, setCorreo] = useState("");

  const register = async () => {
    if (nombre === "") {
      M.toast({
        html: "Nombre Invalido",
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

    if (correo === "") {
      M.toast({
        html: "Correo Invalido",
        classes: "white-text rounded orange darken-4",
      });
    }

    const data = {
      rol: "1",
      name: nombre,
      password: password,
      correo: correo,
    };

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
          <div className="col s8 offset-s2">
            <div className="card-panel hoverable">
              <div className="card-content">
                <h3 className="green-text text-darken-2 center-align">
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
                        <i className="material-icons prefix">password</i>
                        <input
                          id="password"
                          type="password"
                          className="validate"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">mail_outline</i>
                        <input
                          id="correo"
                          type="email"
                          className="validate"
                          onChange={(e) => setCorreo(e.target.value)}
                        />
                        <label htmlFor="correo">Correo</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s8 offset-s3">
                        <a
                          href="#!"
                          className="waves-effect waves-light btn-large green darken-2"
                          onClick={register}
                        >
                          <i className="material-icons left">how_to_reg</i>
                          Registrar Usuario
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
