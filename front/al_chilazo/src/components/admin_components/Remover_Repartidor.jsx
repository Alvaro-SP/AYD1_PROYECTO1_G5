import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export function RemoverRepartidor() {
  const [listadoRepartidores, setListadoRepartidores] = useState([]);
  const [repartidorModal, setRepartidor] = useState("");

  useEffect(() => {
    getData();

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
    });
  }, []);

  const getData = async () => {
    try {
      const result = (await axios.get(url + "getRepartidores")).data;
      console.log(result);

      if (result.res) {
        setListadoUsers(result.users);

        M.toast({
          html: result.message,
          classes: "white-text rounded green darken-4",
        });
      }
    } catch (error) {
      M.toast({
        html: error.message,
        classes: "white-text rounded red darken-4",
      });
    }
  };

  const eliminarRepartidor = async () => {
    const data = {
      repartidor: repartidorModal,
    };

    try {
      const result = (await axios.post(url + "deleteRepartidor", data)).data;
      console.log(result);

      if (result.res) {
        let aux = listadoRepartidores.filter(
          (repartidor) => repartidor.nombre !== repartidorModal
        );
        setListadoRepartidores(aux);

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
                {listadoRepartidores.map((repartidor) => {
                  return (
                    <li className="collection-item avatar">
                      <i className="material-icons circle indigo darken-2">
                        delivery_dining
                      </i>
                      <span className="title">{repartidor.nombre}</span>
                      <p>
                        {repartidor.correo} <br />
                        {repartidor.numero}
                      </p>
                      <a
                        href="#conf-delete-rep"
                        className="secondary-content modal-trigger hicon"
                        onClick={() => setRepartidor(repartidor.nombre)}
                      >
                        <i className="material-icons red-text iconSize">
                          cancel
                        </i>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="modal" id="conf-delete-rep">
        <div className="modal-content">
          <h4>Confirmar Eliminacion</h4>
          <div className="divider"></div>
          <p>Seguro que desea eliminar al Repartidor {repartidorModal}?</p>
          <p>Esta opcion no se puede revertir...</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={eliminarRepartidor}
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
