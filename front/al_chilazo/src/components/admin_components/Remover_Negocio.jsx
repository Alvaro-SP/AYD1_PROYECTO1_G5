import { useEffect, useState } from "react";
import { url } from "../../shared/url";
import axios from "axios";

export function RemoverNegocio() {
  const [listaNegocios, setListadoNegocios] = useState([]);
  const [negocioModal, setNegocio] = useState("");

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
      const result = (await axios.get(url + "getNegocios")).data;
      console.log(result);

      if (result.res) {
        setListadoNegocios(result.negocios);

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

  const eliminarNegocio = async () => {
    const data = {
      negocio: negocioModal,
    };

    try {
      const result = (await axios.post(url + "deleteNegocio", data)).data;
      console.log(result);

      if (result.res) {
        let aux = listaNegocios.filter(
          (negocio) => negocio.nombre !== userModal
        );
        setListadoNegocios(aux);

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
              <h2 className="deep-orange-text text-darken-2 center-align">
                Remover Negocio
              </h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ul className="collection">
                {listaNegocios.map((negocio) => {
                  return (
                    <li className="collection-item avatar">
                      <i className="material-icons circle deep-orange darken-4">
                        restaurant
                      </i>
                      <span className="title">
                        {"Negocio: " + negocio.nombre}
                      </span>
                      <p>{"Correo: " + negocio.correo}</p>
                      <a
                        href="#conf-delete-buisness"
                        className="secondary-content modal-trigger hicon"
                        onClick={() => setNegocio(user.nombre)}
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
      <div className="modal" id="conf-delete-buisness">
        <div className="modal-content">
          <h4>Confirmar Eliminacion</h4>
          <div className="divider"></div>
          <p>Seguro que desea eliminar al negocio {negocioModal}?</p>
          <p>Esta opcion no se puede revertir...</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={eliminarNegocio}
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
