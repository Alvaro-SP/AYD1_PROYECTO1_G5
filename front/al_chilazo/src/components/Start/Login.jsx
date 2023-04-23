import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export function Login({adFlag, repFlag, empFlag, userFlag, startFlag}) {
  //? AGREGAR VALIDACION DE CORREO CON EXPRESION REGULAR
  //? CAMBIAR LOS ID, HACERLOS UNICOS
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
      console.log("usuario devuelto: ",result)

      if (result.res) {
        sessionStorage.setItem("auth", result.access_token);
        localStorage.setItem("rol", rol)
        localStorage.setItem("user", JSON.stringify(result.user))
        

        if(rol === "0"){
          startFlag(false)
          adFlag(true)
        } else if(rol === "1") {
          startFlag(false)
          userFlag(true)
          //reiniar carrito al iniciar sesion en local storage
          localStorage.setItem("carrito", JSON.stringify([]))
          localStorage.setItem("totalPedido", JSON.stringify(0))
        } else if(rol === "2") {
          startFlag(false)
          repFlag(true)
        } else if(rol === "3") {
          startFlag(false)
          empFlag(true)
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

  return (
    <>
      <div className="containerl">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="card-panel hoverable">
              <div className="card-contentl">
                <h3 className="red-text text-darken-2 center-align">LOGIN</h3>
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
                        <label htmlFor="email">EMAIL</label>
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
                        <label htmlFor="pass">PASSWORD</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">remember_me</i>
                        <select
                          className="validate"
                          onChange={(e) => setRol(e.target.value)}
                          defaultValue={""}
                        >
                          <option value={""} disabled>
                            SELECCIONE EL ROL
                          </option>
                          <option value="0">ADMINISTRADOR</option>
                          <option value="1">USUARIO</option>
                          <option value="2">REPARTIDOR</option>
                          <option value="3">EMPRESA</option>
                        </select>
                        <label>ROL</label>
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
