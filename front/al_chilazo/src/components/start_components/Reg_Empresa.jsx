export function RegistrarEmpresa() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="card-panel hoverable">
              <div className="card-content">
                <h3 className="orange-text text-darken-3 center-align">Registrarse</h3>
                <div className="row">
                  <form className="col s10 offset-s1">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">business</i>
                        <input id="nombre" type="text" className="validate" />
                        <label htmlFor="nombre">Nombre Empresa</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                      <i className="material-icons prefix">description</i>
                        <textarea
                          id="descripcion"
                          className="materialize-textarea"
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
                        />
                        <label htmlFor="categoria">Categoria</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">alternate_email</i>
                        <input id="email" type="text" className="validate" />
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
                          <input type="file" />
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
                          <input type="file" />
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
                          <input type="file" />
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
                        >
                          <i className="material-icons left">send_time_extension</i>
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
