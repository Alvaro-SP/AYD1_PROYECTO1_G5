export function RegistrarUsuario() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="card-panel hoverable">
              <div className="card-content">
                <h3 className="pink-text text-darken-2 center-align">
                  Registrarse
                </h3>
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
                        <i className="material-icons prefix">account_circle</i>
                        <input id="user" type="text" className="validate" />
                        <label htmlFor="user">Usuario</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">password</i>
                        <input
                          id="password"
                          type="password"
                          className="validate"
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">mail_outline</i>
                        <input id="correo" type="email" className="validate" />
                        <label htmlFor="correo">Correo</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s8 offset-s3">
                        <a
                          href="#!"
                          className="waves-effect waves-red btn-large pink darken-2"
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
