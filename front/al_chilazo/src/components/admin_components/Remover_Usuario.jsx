import { useEffect } from "react";
import "../../styles/remover_usuario.css";

export function RemoverUsuario() {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8
    });
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="red-text text-darken-3 center-align">
                Remover Usuarios
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ul className="collection">
                <li className="collection-item avatar">
                  <i className="material-icons circle green darken-1">person</i>
                  <span className="title">User</span>
                  <p>
                    First Name <br />
                    Last Name
                  </p>
                  <a
                    href="#conf-delete"
                    className="secondary-content modal-trigger hicon"
                  >
                    <i className="material-icons red-text iconSize">cancel</i>
                  </a>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle green darken-1">person</i>
                  <span className="title">User</span>
                  <p>
                    First Name <br />
                    Last Name
                  </p>
                  <a
                    href="#conf-delete"
                    className="secondary-content modal-trigger hicon"
                  >
                    <i className="material-icons red-text iconSize">cancel</i>
                  </a>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle green darken-1">person</i>
                  <span className="title">User</span>
                  <p>
                    First Name <br />
                    Last Name
                  </p>
                  <a
                    href="#conf-delete"
                    className="secondary-content modal-trigger hicon"
                  >
                    <i className="material-icons red-text iconSize">cancel</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div id="conf-delete" className="modal">
        <div className="modal-content">
          <h4>Confirmar Eliminacion</h4>
          <div className="divider"></div>
          <p>Seguro que desea eliminar al usuario Usuario 1?</p>
          <p>Esta opcion no se puede revertir...</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
          <a href="#!" className="modal-close waves-effect waves-red btn-flat">
            Dismiss
          </a>
        </div>
      </div>
    </>
  );
}
