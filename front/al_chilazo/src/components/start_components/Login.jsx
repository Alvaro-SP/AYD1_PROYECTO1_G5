import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  });

  const login = async () => {
    const data = {
      rol: rol,
      email: email,
      pass: pass,
    };

    try {
      if (email === "") {
        M.toast({
          html: "Email Invalido",
          classes: "white-text rounded orange darken-3",
        });

        return;
      }

      if (pass === "") {
        M.toast({
          html: "Password Invalido",
          classes: "white-text rounded orange darken-3",
        });

        return;
      }

      if (rol === "") {
        M.toast({
          html: "Rol Invalido",
          classes: "white-text rounded orange darken-3",
        });

        return;
      }

      console.log(data);
      const result = (await axios.post(url + "login", data)).data;

      if (result.res) {
        // TODO: ENVIAR LOS RESULTADOS PERTINENTES A SU COMPONENTE DESTINO
        
        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      } else {
        M.toast({
          html: result.res,
          classes: "white-text rounded red darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4 flow-text",
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
                <h3 className="red-text text-darken-2 center-align">Login</h3>
                <div className="row">
                  <form className="col s10 offset-s1">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input
                          id="email"
                          type="email"
                          className="validate"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">key</i>
                        <input
                          id="pass"
                          type="password"
                          className="validate"
                          onChange={(e) => setPass(e.target.value)}
                        />
                        <label htmlFor="pass">Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">remember_me</i>
                        <select
                          className="validate"
                          onChange={(e) => setRol(e.target.value)}
                        >
                          <option defaultValue={""} disabled>
                            Choose your option
                          </option>
                          <option value="1">Usuario</option>
                          <option value="2">Repartidor</option>
                          <option value="3">Empresa</option>
                        </select>
                        <label>Rol</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6 offset-s4">
                        <a
                          href="#!"
                          className="waves-effect waves-light btn-large red darken-3"
                          onClick={login}
                        >
                          <i className="material-icons left">login</i>
                          Login
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
