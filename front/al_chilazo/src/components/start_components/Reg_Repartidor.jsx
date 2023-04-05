import { useEffect } from "react";

export function RegistrarRepartidor() {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="card-panel hoverable">
              <div className="card-content">
                <h3 className="indigo-text text-darken-3 center-align">Registrarse</h3>
                <div className="row">
                  <form className="col s10 offset-s1">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">person</i>
                        <input id="nombre" type="text" className="validate" />
                        <label htmlFor="nombre">Nombre</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">person</i>
                        <input id="apellido" type="text" className="validate" />
                        <label htmlFor="apellido">Apellido</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">markunread</i>
                        <input id="email" type="email" className="validate" />
                        <label htmlFor="email">Correo</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">smartphone</i>
                        <input id="telefono" type="tel" className="validate" />
                        <label htmlFor="telefono">No. Celular</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <select>
                          <option defaultValue={""}>Choose your option</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                        <label>Departamento</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <select>
                          <option defaultValue={""}>Choose your option</option>
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
                            <input type="checkbox" />
                            <span>Posee Licencia</span>
                          </label>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <select>
                          <option defaultValue={""}>Choose your option</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                        <label>Tipo Licencia</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="file-field input-field">
                        <div className="btn indigo darken-3">
                          <span>Cargar CV</span>
                          <input type="file" />
                        </div>
                        <div className="file-path-wrapper">
                          <input type="text" className="file-path validate" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s9 offset-s3">
                        <a
                          href="#!"
                          className="waves-effect waves-red btn-large indigo darken-3"
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
