import { useEffect } from "react";

export function RemoverRepartidor() {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
    });
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2 className="deep-purple-text text-darken-2 center-align">
                Remover Repartidores
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ul className="collection">
                <li className="collection-item avatar">
                  <i className="material-icons circle indigo darken-2">
                    delivery_dining
                  </i>
                  <span className="title">First Name</span>
                  <p>Last Name</p>
                  <a
                    href="#conf-delete-rep"
                    className="secondary-content modal-trigger hicon"
                  >
                    <i className="material-icons red-text iconSize">cancel</i>
                  </a>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle indigo darken-2">
                    delivery_dining
                  </i>
                  <span className="title">First Name</span>
                  <p>Last Name</p>
                  <a
                    href="#conf-delete-rep"
                    className="secondary-content modal-trigger hicon"
                  >
                    <i className="material-icons red-text iconSize">cancel</i>
                  </a>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle indigo darken-2">
                    delivery_dining
                  </i>
                  <span className="title">First Name</span>
                  <p>Last Name</p>
                  <a
                    href="#conf-delete-rep"
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
      <div className="modal" id="conf-delete-rep">
        <div className="modal-content">
          <h4>Confirmar Eliminacion</h4>
          <div className="divider"></div>
          <p>Seguro que desea eliminar al Repartidor Repartidor X?</p>
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
