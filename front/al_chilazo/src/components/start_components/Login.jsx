export function Login() {
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
                        <i className="material-icons prefix">account_circle</i>
                        <input id="user" type="text" className="validate" />
                        <label htmlFor="user">Usuario</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">key</i>
                        <input id="pass" type="password" className="validate" />
                        <label htmlFor="pass">Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6 offset-s4">
                        <a
                          href="#!"
                          className="waves-effect waves-light btn-large red darken-3"
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
